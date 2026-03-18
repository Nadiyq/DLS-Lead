import React from 'react';
import './upload-file-form.css';
import { Button } from '../Button';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type FileItemStatus = 'uploading' | 'complete' | 'error';

export interface FileItem {
  /** Unique id */
  id: string;
  /** File name */
  name: string;
  /** File size display string (e.g. "20 MB") */
  size: string;
  /** Upload status */
  status: FileItemStatus;
  /** Progress 0–100 (only used when status = "uploading") */
  progress?: number;
  /** Optional media/thumbnail slot */
  media?: React.ReactNode;
}

export interface UploadFileFormProps {
  /** Form title */
  title?: string;
  /** Form subtitle */
  subtitle?: string;
  /** Drop zone title */
  dropzoneTitle?: string;
  /** Drop zone description */
  dropzoneDescription?: string;
  /** Upload button label */
  uploadLabel?: string;
  /** List of files */
  files?: FileItem[];
  /** Extra slot content */
  slotContent?: React.ReactNode;
  /** Called when files are dropped or selected */
  onFilesAdded?: (files: FileList) => void;
  /** Called when a file is removed */
  onFileRemove?: (id: string) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 10V2M8 2L5 5M8 2L11 5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 10V13H14V10" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2H12L16 6V18H4V2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M12 2V6H16" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Status label map
   --------------------------------------------------------------------------- */

const STATUS_LABELS: Record<FileItemStatus, string> = {
  uploading: 'Uploading',
  complete: 'Complete',
  error: 'Error',
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const UploadFileForm = React.forwardRef<HTMLDivElement, UploadFileFormProps>(
  (props, ref) => {
    const {
      title = 'Upload files',
      subtitle = 'Fill out the form below to schedule your appointment.',
      dropzoneTitle = 'Drag & drop or browse files',
      dropzoneDescription = 'jpeg, png, pdf, up to 500 MB',
      uploadLabel = 'Upload',
      files = [],
      slotContent,
      onFilesAdded,
      onFileRemove,
      className,
    } = props;

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = React.useState(false);

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        onFilesAdded?.(e.dataTransfer.files);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(true);
    };

    const handleDragLeave = () => {
      setDragOver(false);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFilesAdded?.(e.target.files);
        e.target.value = '';
      }
    };

    return (
      <div
        ref={ref}
        className={['dls-upload-file-form', className].filter(Boolean).join(' ')}
      >
        {/* Header */}
        <div className="dls-upload-file-form__header">
          <h2 className="dls-upload-file-form__title">{title}</h2>
          {subtitle && <p className="dls-upload-file-form__subtitle">{subtitle}</p>}
        </div>

        {/* Body: dropzone + slot + file list */}
        <div className="dls-upload-file-form__body">
          {/* Drop zone */}
          <div className="dls-upload-file-form__dropzone-wrapper">
            <div
              className="dls-upload-file-form__dropzone"
              data-drag-over={dragOver || undefined}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current?.click()}
            >
              <div className="dls-upload-file-form__dropzone-text">
                <p className="dls-upload-file-form__dropzone-title">{dropzoneTitle}</p>
                <p className="dls-upload-file-form__dropzone-description">{dropzoneDescription}</p>
              </div>
              <Button
                variant="filled"
                intent="info"
                size="m"
                icon={<UploadIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                {uploadLabel}
              </Button>
            </div>
            <input
              ref={inputRef}
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />
          </div>

          {/* Slot content */}
          {slotContent && (
            <div className="dls-upload-file-form__slot">{slotContent}</div>
          )}

          {/* File list */}
          {files.length > 0 && (
            <div className="dls-upload-file-form__list">
              {files.map((file) => (
                <div key={file.id} className="dls-upload-file-form__item">
                  <div className="dls-upload-file-form__item-top">
                    <div className="dls-upload-file-form__item-media">
                      {file.media || <FileIcon />}
                    </div>
                    <div className="dls-upload-file-form__item-info">
                      <span className="dls-upload-file-form__item-name">{file.name}</span>
                      <div className="dls-upload-file-form__item-details">
                        <span className="dls-upload-file-form__item-size">{file.size}</span>
                        {file.status !== 'uploading' && (
                          <span
                            className="dls-upload-file-form__item-badge"
                            data-status={file.status}
                          >
                            {STATUS_LABELS[file.status]}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      intent="neutral"
                      size="m"
                      icon={<CloseIcon />}
                      iconOnly
                      aria-label={`Remove ${file.name}`}
                      onClick={() => onFileRemove?.(file.id)}
                    />
                  </div>

                  {file.status === 'uploading' && (
                    <div className="dls-upload-file-form__progress">
                      <div className="dls-upload-file-form__progress-track">
                        <div
                          className="dls-upload-file-form__progress-fill"
                          style={{ width: `${file.progress ?? 0}%` }}
                        />
                      </div>
                      <span className="dls-upload-file-form__progress-label">
                        {file.progress ?? 0}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

UploadFileForm.displayName = 'UploadFileForm';
