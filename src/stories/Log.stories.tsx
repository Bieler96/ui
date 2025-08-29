import React, { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Log } from '../components/log/Log';

const meta: Meta<typeof Log> = {
  title: 'Components/Log',
  component: Log,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logs: [
      '[2024-08-29 10:00:00] INFO: Application started.',
      '[2024-08-29 10:00:01] DEBUG: Initializing modules...',
      '[2024-08-29 10:00:02] WARN: Deprecated configuration found.',
      '[2024-08-29 10:00:03] ERROR: Failed to connect to database.',
      '[2024-08-29 10:00:04] INFO: Shutting down.',
    ],
  },
};

export const WithObjects: StoryObj<typeof Log<LogEntry>> = {
  args: {
    logs: [
      { timestamp: '2024-08-29 10:00:00', level: 'INFO', message: 'Application started.' },
      { timestamp: '2024-08-29 10:00:01', level: 'DEBUG', message: 'Initializing modules...' },
      { timestamp: '2024-08-29 10:00:02', level: 'WARN', message: 'Deprecated configuration found.' },
      { timestamp: '2024-08-29 10:00:03', level: 'ERROR', message: 'Failed to connect to database.' },
      { timestamp: '2024-08-29 10:00:04', level: 'INFO', message: 'Shutting down.' },
    ],
    formatter: (item) => `[${item.timestamp}] ${item.level}: ${item.message}`,
  },
};

const logLevels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
const logMessages = [
  'User logged in',
  'Failed to load resource',
  'Data saved successfully',
  'Invalid input received',
  'Connection timed out',
];

export const WithLiveLogs: Story = {
  render: () => {
    const [logs, setLogs] = useState<string[]>([]);
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const interval = setInterval(() => {
        const level = logLevels[Math.floor(Math.random() * logLevels.length)];
        const message = logMessages[Math.floor(Math.random() * logMessages.length)];
        setLogs(prevLogs => [
          ...prevLogs,
          `[${new Date().toISOString()}] ${level}: ${message}`,
        ]);
      }, Math.random() * 5000 + 1000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
      }
    }, [logs]);

    return (
      <Log 
        logs={logs} 
        style={{ maxHeight: '500px', overflow: 'auto' }}
        ref={logContainerRef}
      />
    );
  },
};
