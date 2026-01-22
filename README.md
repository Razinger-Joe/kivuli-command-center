# Kivuli Command Center

**Kivuli Command Center** is a state-of-the-art cybersecurity dashboard designed for real-time threat monitoring and defense coordination, with a specific focus on the Kenyan region. "Kivuli" (Swahili for "Shadow") represents our covert capability to track intruders and deploy shadow assets like decoys and sinkholes.

![Dashboard Preview](public/placeholder.svg)

## Features

- **Real-Time Threat Monitoring**: Live tracking of intrusions, neutralized threats, and active monitoring zones.
- **Kenya Threat Map**: Geospatial visualization of cyber threats across Kenya.
- **Activity Feed**: Live log of system events, including decoy deployments and intrusion attempts.
- **Forensics & Sinkholes**: Tools for analyzing attack vectors and managing defensive sinkholes.
- **Factory**: [Details to be added based on analysis]
- **Responsive Design**: Built with a "Glassmorphism" aesthetic for a modern, high-tech command center feel.

## Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Lucide Icons
- **Charts**: Recharts
- **State Management**: React Query (Tanstack Query)
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-org/kivuli-command-center.git
    cd kivuli-command-center
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    bun install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Build for production:
    ```bash
    npm run build
    ```

## Project Structure

- `src/pages`: Main application views (Dashboard, Forensics, etc.)
- `src/components`: Reusable UI components and widgets (AttackChart, KenyaMap, etc.)
- `src/lib`: Utility functions and configuration.
- `src/hooks`: Custom React hooks.

## Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
