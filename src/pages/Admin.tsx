import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Upload, Trash2, FileText, FolderOpen, RefreshCw, 
  CheckCircle, AlertCircle, LogOut, ArrowLeft, Eye 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = '/.netlify/functions/admin-api';

interface FileItem {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  download_url: string;
}

interface StatusMessage {
  type: 'success' | 'error' | 'loading';
  text: string;
}

// Helper to call the secure serverless function
async function adminFetch(password: string, action: string, data: Record<string, any> = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, action, ...data }),
  });
  return res.json();
}

// Convert file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data:...;base64, prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// ─── Login Screen ────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Test the password against the serverless function
    try {
      const result = await adminFetch(password, 'list', { path: 'public' });
      if (result.error === 'Invalid password') {
        setError('ACCESS_DENIED: Invalid credentials');
        setLoading(false);
      } else {
        onLogin(password);
      }
    } catch {
      setError('CONNECTION_ERROR: Cannot reach server');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="border border-surface bg-surface/5 p-8 md:p-12 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <Lock size={24} className="text-accent" />
            <h1 className="font-sans text-2xl md:text-3xl">ADMIN_AUTH</h1>
          </div>

          <div className="font-mono text-xs text-muted mb-8 border-l-2 border-accent pl-4">
            // Secure access required<br />
            // Unauthorized access is logged
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-mono text-xs text-accent uppercase tracking-widest mb-2 block">Password</label>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg border border-surface p-4 font-mono text-fg focus:border-accent outline-none transition-colors"
                placeholder="Enter admin password..."
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-red-400 font-mono text-xs"
              >
                <AlertCircle size={14} /> {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-bg font-mono text-sm py-4 uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><RefreshCw size={14} className="animate-spin" /> Authenticating...</>
              ) : (
                'Authenticate'
              )}
            </button>
          </form>
        </div>

        <Link to="/" className="font-mono text-xs text-muted hover:text-accent transition-colors mt-6 flex items-center gap-2 justify-center">
          <ArrowLeft size={12} /> cd ../home
        </Link>
      </motion.div>
    </div>
  );
}

// ─── File Section Component ─────────────────────────
function FileSection({
  title,
  dirPath,
  password,
  onStatus,
}: {
  title: string;
  dirPath: string;
  password: string;
  onStatus: (msg: StatusMessage | null) => void;
}) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const result = await adminFetch(password, 'list', { path: dirPath });
      if (result.files) {
        setFiles(result.files.filter((f: FileItem) => f.type === 'file'));
      } else {
        setFiles([]);
      }
    } catch {
      setFiles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFiles();
  }, [dirPath]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onStatus({ type: 'loading', text: `Uploading ${file.name}...` });

    try {
      const content = await fileToBase64(file);
      const path = `${dirPath}/${file.name}`;
      const result = await adminFetch(password, 'upload', { path, content });

      if (result.success) {
        onStatus({ type: 'success', text: `${file.name} uploaded successfully. Site will redeploy in ~60s.` });
        await loadFiles();
      } else {
        onStatus({ type: 'error', text: result.error || 'Upload failed' });
      }
    } catch (err: any) {
      onStatus({ type: 'error', text: err.message || 'Upload failed' });
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (file: FileItem) => {
    if (!confirm(`Delete ${file.name}? This cannot be undone.`)) return;

    onStatus({ type: 'loading', text: `Deleting ${file.name}...` });

    try {
      const result = await adminFetch(password, 'delete', { path: file.path, sha: file.sha });
      if (result.success) {
        onStatus({ type: 'success', text: `${file.name} deleted. Site will redeploy in ~60s.` });
        await loadFiles();
      } else {
        onStatus({ type: 'error', text: result.error || 'Delete failed' });
      }
    } catch (err: any) {
      onStatus({ type: 'error', text: err.message || 'Delete failed' });
    }
  };

  return (
    <div className="border border-surface bg-surface/5 p-6 hover:border-accent/30 transition-colors">
      <div className="flex items-center justify-between mb-4 border-b border-surface/50 pb-2">
        <h3 className="font-mono text-xs text-muted uppercase tracking-widest flex items-center gap-2">
          <FolderOpen size={14} className="text-accent" /> {title}
        </h3>
        <button
          onClick={loadFiles}
          className="text-muted hover:text-accent transition-colors"
          title="Refresh"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="font-mono text-xs text-muted py-4 text-center">Loading...</div>
      ) : files.length === 0 ? (
        <div className="font-mono text-xs text-muted py-4 text-center border border-dashed border-surface">
          No files uploaded yet
        </div>
      ) : (
        <div className="space-y-2 mb-4">
          {files.map((file) => (
            <div
              key={file.sha}
              className="flex items-center justify-between p-3 bg-bg border border-surface hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText size={16} className="text-muted group-hover:text-accent transition-colors shrink-0" />
                <div className="min-w-0">
                  <span className="font-mono text-sm text-fg/80 truncate block">{file.name}</span>
                  <span className="font-mono text-[10px] text-muted">{formatBytes(file.size)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {file.download_url && (
                  <a
                    href={file.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors p-1"
                    title="Preview"
                  >
                    <Eye size={14} />
                  </a>
                )}
                <button
                  onClick={() => handleDelete(file)}
                  className="text-muted hover:text-red-400 transition-colors p-1"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleUpload}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full border border-dashed border-surface hover:border-accent text-muted hover:text-accent font-mono text-xs uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors"
      >
        <Upload size={14} /> Upload File
      </button>
    </div>
  );
}

// ─── Main Admin Dashboard ───────────────────────────
export default function Admin() {
  const [password, setPassword] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusMessage | null>(null);

  // Auto-clear status messages
  useEffect(() => {
    if (status && status.type !== 'loading') {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!password) {
    return <LoginScreen onLogin={setPassword} />;
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 md:px-12 relative">
      {/* Background */}
      <div className="fixed top-20 right-0 text-[12vw] font-sans text-surface opacity-10 pointer-events-none select-none z-0">
        ADMIN
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-accent font-mono text-sm mb-4 transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              cd ../home
            </Link>
            <h1 className="text-4xl md:text-6xl font-sans text-stroke tracking-tighter">ADMIN</h1>
            <p className="font-mono text-xs text-muted mt-2">
              <span className="text-accent">●</span> Authenticated — Changes auto-deploy in ~60s
            </p>
          </div>
          <button
            onClick={() => setPassword(null)}
            className="text-muted hover:text-red-400 transition-colors font-mono text-xs flex items-center gap-2 border border-surface px-4 py-2 hover:border-red-400"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Status Bar */}
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-8 p-4 border font-mono text-sm flex items-center gap-3 ${
                status.type === 'success'
                  ? 'border-green-500/50 text-green-400 bg-green-500/5'
                  : status.type === 'error'
                  ? 'border-red-500/50 text-red-400 bg-red-500/5'
                  : 'border-accent/50 text-accent bg-accent/5'
              }`}
            >
              {status.type === 'success' && <CheckCircle size={16} />}
              {status.type === 'error' && <AlertCircle size={16} />}
              {status.type === 'loading' && <RefreshCw size={16} className="animate-spin" />}
              {status.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Sections */}
        <div className="space-y-8">
          {/* Resume */}
          <div>
            <h2 className="font-sans text-xl md:text-2xl mb-4 flex items-center gap-2">
              <span className="text-accent">01.</span> Resume
            </h2>
            <FileSection
              title="public/"
              dirPath="public"
              password={password}
              onStatus={setStatus}
            />
            <p className="font-mono text-[10px] text-muted mt-2">
              Upload your Resume.pdf here. It powers the "Download Resume" button on the homepage.
            </p>
          </div>

          {/* Experience Documents */}
          <div>
            <h2 className="font-sans text-xl md:text-2xl mb-4 flex items-center gap-2">
              <span className="text-accent">02.</span> PearlThoughts — Proofs
            </h2>
            <FileSection
              title="documents/pearlthoughts/"
              dirPath="public/documents/pearlthoughts"
              password={password}
              onStatus={setStatus}
            />
          </div>

          <div>
            <h2 className="font-sans text-xl md:text-2xl mb-4 flex items-center gap-2">
              <span className="text-accent">03.</span> CID Jharkhand — Proofs
            </h2>
            <FileSection
              title="documents/cid-jharkhand/"
              dirPath="public/documents/cid-jharkhand"
              password={password}
              onStatus={setStatus}
            />
          </div>

          <div>
            <h2 className="font-sans text-xl md:text-2xl mb-4 flex items-center gap-2">
              <span className="text-accent">04.</span> BCCL — Proofs
            </h2>
            <FileSection
              title="documents/bccl/"
              dirPath="public/documents/bccl"
              password={password}
              onStatus={setStatus}
            />
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 border-t border-surface pt-6 font-mono text-xs text-muted">
          <p>All uploads are committed to your GitHub repository. Each change triggers an automatic redeploy via Netlify (~60 seconds).</p>
        </div>
      </div>
    </div>
  );
}
