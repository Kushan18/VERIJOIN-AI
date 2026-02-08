import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatAgent from "@/components/ChatAgent";
import { UserProvider } from "@/context/UserContext";

export const metadata = {
  title: "VeriJoin | Career Trust Platform",
  description: "Turning Offer Verification Waiting Time into Opportunity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <UserProvider>
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            transition: 'background 0.3s ease, color 0.3s ease'
          }}>
            {/* Always visible Horizontal Top Navbar */}
            <Navbar />

            {/* Main content area */}
            <main
              style={{
                flex: 1,
                width: '100%',
                marginTop: '80px', // Navbar height
                paddingTop: '60px', // Extra breathing room
                paddingLeft: '20px',
                paddingRight: '20px',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                transition: 'background 0.3s ease, color 0.3s ease'
              }}
            >
              {children}
            </main>

            {/* Floating Career Assistant */}
            <ChatAgent />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
