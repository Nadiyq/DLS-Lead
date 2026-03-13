import type { Meta, StoryObj } from '@storybook/react-vite';
import { UploadFileForm } from './UploadFileForm';
import type { FileItem } from './UploadFileForm';

const meta = {
  title: 'Templates/UploadFileForm',
  component: UploadFileForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof UploadFileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Sample files
   --------------------------------------------------------------------------- */

const completedFiles: FileItem[] = [
  { id: '1', name: 'My-file.pdf', size: '20 MB', status: 'complete' },
  { id: '2', name: 'Photo-2024.png', size: '5 MB', status: 'complete' },
];

const mixedFiles: FileItem[] = [
  { id: '1', name: 'My-file.pdf', size: '20 MB', status: 'complete' },
  { id: '2', name: 'Large-archive.zip', size: '120 MB', status: 'uploading', progress: 75 },
];

const uploadingFiles: FileItem[] = [
  { id: '1', name: 'Document.pdf', size: '8 MB', status: 'uploading', progress: 30 },
  { id: '2', name: 'Report.xlsx', size: '2 MB', status: 'uploading', progress: 90 },
];

const errorFiles: FileItem[] = [
  { id: '1', name: 'Corrupted.zip', size: '45 MB', status: 'error' },
  { id: '2', name: 'Photo.jpg', size: '3 MB', status: 'complete' },
];

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    title: 'Upload files',
    subtitle: 'Fill out the form below to schedule your appointment.',
    files: mixedFiles,
  },
};

/* ---------------------------------------------------------------------------
   Empty (no files)
   --------------------------------------------------------------------------- */

export const Empty: Story = {
  args: {
    files: [],
  },
};

/* ---------------------------------------------------------------------------
   With completed files
   --------------------------------------------------------------------------- */

export const WithCompletedFiles: Story = {
  args: {
    files: completedFiles,
  },
};

/* ---------------------------------------------------------------------------
   Uploading
   --------------------------------------------------------------------------- */

export const Uploading: Story = {
  args: {
    files: uploadingFiles,
  },
};

/* ---------------------------------------------------------------------------
   With errors
   --------------------------------------------------------------------------- */

export const WithErrors: Story = {
  args: {
    files: errorFiles,
  },
};

/* ---------------------------------------------------------------------------
   Custom labels
   --------------------------------------------------------------------------- */

export const CustomLabels: Story = {
  args: {
    title: 'Attach documents',
    subtitle: 'Upload supporting documents for your application.',
    dropzoneTitle: 'Drop files here or click to browse',
    dropzoneDescription: 'PDF and DOCX only, up to 25 MB each',
    uploadLabel: 'Browse',
    files: [],
  },
};
