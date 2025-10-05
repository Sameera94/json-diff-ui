# JSON Compare UI

A simple web application for comparing two JSON objects and visualizing their differences side-by-side.

## What It Does

This tool allows you to:

- **Input JSON Data**: Paste or type JSON objects in two separate text areas
- **Compare Differences**: Click a button to analyze differences between the JSONs
- **Visual Results**: See highlighted differences in an interactive tree view

## Screenshots

https://github.com/user-attachments/assets/0b0632d3-a4f5-4e78-acdd-5f4ae108979e

<img width="1850" height="1742" alt="ui-with-data" src="https://github.com/user-attachments/assets/b1f1f66d-f542-4bbe-a7a8-20a0d9a020b3" />

## Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** package manager

### Local Development Setup

- Clone the repository
- Install dependencies
   ```bash
   npm install
   ```
- Start the development server
   ```bash
   npm run dev
   ```
- Open your browser
   ```bash
   http://localhost:5173
   ```
- Run tests
   ```bash
   npm run test:unit
   ```

### Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI components (Button, Card, Textarea)
│   ├── molecules/       # Simple composed components
│   ├── organisms/       # Complex components
│   └── templates/       # Page-level components
├── utils/               # Utility functions
├── api/                 # API communication layer
└── __tests__/           # Unit tests
```
