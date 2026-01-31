import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// EDIT YOUR APPS HERE
// ═══════════════════════════════════════════════════════════════
const APPS_DATA = [
  {
    id: 1,
    name: "Esign",
    version: "v5.0.1",
    downloads: "15,782",
    icon: "📱",
    description: "eSign is an on-device IPA signing tool for iOS devices, enabling users to sign and install IPA files.",
    category: "Apps",
    features: ["On-device signing", "No computer required", "Multiple certificates"],
    installLink: "https://your-install-link.com/esign",
    downloadLink: "https://your-download-link.com/esign.ipa"
  },
  {
    id: 2,
    name: "Scarlet",
    version: "v10.24.00",
    downloads: "1,437",
    icon: "🔴",
    description: "Scarlet is a cutting-edge iOS sideloading and app management tool that allows users to install.",
    category: "Apps",
    features: ["App management", "Easy sideloading", "No revokes"],
    installLink: "https://your-install-link.com/scarlet",
    downloadLink: "https://your-download-link.com/scarlet.ipa"
  },
  {
    id: 3,
    name: "Delta",
    version: "v2.704.1059",
    downloads: "9,774",
    icon: "🎮",
    description: "A third-party scripting utility designed for advanced Roblox modification, allowing users to...",
    category: "Games",
    features: ["Game emulation", "Multiple consoles", "Save states"],
    installLink: "https://your-install-link.com/delta",
    downloadLink: "https://your-download-link.com/delta.ipa"
  },
  {
    id: 4,
    name: "CapCut Pro",
    version: "v12.0",
    downloads: "1,376",
    icon: "✂️",
    description: "CapCut Pro is a powerful video editing app that offers advanced tools for creating professional...",
    category: "Photos",
    features: ["Pro features unlocked", "No watermark", "All effects"],
    installLink: "https://your-install-link.com/capcut",
    downloadLink: "https://your-download-link.com/capcut.ipa"
  },
  {
    id: 5,
    name: "Feather",
    version: "v3.3.1",
    downloads: "1,318",
    icon: "🪶",
    description: "Feather is a modern, open-source on-device iOS IPA signer and app management tool designed for seamless app...",
    category: "Apps",
    features: ["Open source", "Fast signing", "Modern UI"],
    installLink: "https://your-install-link.com/feather",
    downloadLink: "https://your-download-link.com/feather.ipa"
  },
  {
    id: 6,
    name: "Eevee Spotify",
    version: "v9.0.22",
    downloads: "774",
    icon: "🎵",
    description: "EeveeSpotify enables free access to several Spotify Premium features, such as ad-free listening...",
    category: "Music",
    features: ["Ad-free", "Unlimited skips", "High quality"],
    installLink: "https://your-install-link.com/spotify",
    downloadLink: "https://your-download-link.com/spotify.ipa"
  },
  {
    id: 7,
    name: "YouTube Plus",
    version: "v19.39.1",
    downloads: "803",
    icon: "📺",
    description: "A flexible enhancer for YouTube on iOS, featuring over hundred customizable options.",
    category: "Social Media",
    features: ["Background play", "No ads", "Download videos"],
    installLink: "https://your-install-link.com/youtube",
    downloadLink: "https://your-download-link.com/youtube.ipa"
  },
  {
    id: 8,
    name: "Fortnite",
    version: "v29.30.1",
    downloads: "780",
    icon: "🎯",
    description: "Fortnite is a popular battle royale game where players fight to be the last one standing. DISCLAIMER:...",
    category: "Games",
    features: ["Battle Royale", "Creative mode", "Regular updates"],
    installLink: "https://your-install-link.com/fortnite",
    downloadLink: "https://your-download-link.com/fortnite.ipa"
  },
  {
    id: 9,
    name: "Minecraft",
    version: "v1.21.62",
    downloads: "687",
    icon: "⛏️",
    description: "Minecraft is a sandbox game that allows players to explore infinite worlds and...",
    category: "Games",
    features: ["Unlimited worlds", "Multiplayer", "Mods support"],
    installLink: "https://your-install-link.com/minecraft",
    downloadLink: "https://your-download-link.com/minecraft.ipa"
  },
  {
    id: 10,
    name: "Chat Smith",
    version: "v7.11.0",
    downloads: "438",
    icon: "💬",
    description: "ChatGPT 3.5 and 4. iAP Hack (Press buy subscription and close - it will work)",
    category: "Social Media",
    features: ["GPT-4 access", "Unlimited chats", "No subscription"],
    installLink: "https://your-install-link.com/chatsmith",
    downloadLink: "https://your-download-link.com/chatsmith.ipa"
  },
  {
    id: 11,
    name: "BHTikTok+",
    version: "v37.8",
    downloads: "426",
    icon: "🎬",
    description: "BHTikTok+ is a modified version of TikTok that enhances the user experience with...",
    category: "Social Media",
    features: ["Download videos", "No watermark", "Extra features"],
    installLink: "https://your-install-link.com/tiktok",
    downloadLink: "https://your-download-link.com/tiktok.ipa"
  },
  {
    id: 12,
    name: "GTA: San Andreas",
    version: "v2.5.3",
    downloads: "443",
    icon: "🚗",
    description: "for free Price in AppStore $6.99. Five years ago, Carl Johnson...",
    category: "Games",
    features: ["Full game unlocked", "All missions", "Save anywhere"],
    installLink: "https://your-install-link.com/gta",
    downloadLink: "https://your-download-link.com/gta.ipa"
  }
];

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function FrozenHub() {
  const [activeTab, setActiveTab] = useState('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedApp, setSelectedApp] = useState<number | null>(null);

  const categories = ['All', 'Apps', 'Games', 'Social Media', 'Photos', 'Music'];

  const filteredApps = APPS_DATA.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>❄️</span>
            <span style={styles.logoText}>frozenhub</span>
          </div>
          
          <nav style={styles.nav}>
            <button 
              onClick={() => setActiveTab('plans')} 
              style={{...styles.navButton, ...(activeTab === 'plans' ? styles.navButtonActive : {})}}
            >
              Plans
            </button>
            <button 
              onClick={() => setActiveTab('library')} 
              style={{...styles.navButton, ...(activeTab === 'library' ? styles.navButtonActive : {})}}
            >
              Library
            </button>
            <button 
              onClick={() => setActiveTab('signer')} 
              style={{...styles.navButton, ...(activeTab === 'signer' ? styles.navButtonActive : {})}}
            >
              Signer
            </button>
            <button 
              onClick={() => setActiveTab('icloud')} 
              style={{...styles.navButton, ...(activeTab === 'icloud' ? styles.navButtonActive : {})}}
            >
              iCloud
            </button>
            <button 
              onClick={() => setActiveTab('guides')} 
              style={{...styles.navButton, ...(activeTab === 'guides' ? styles.navButtonActive : {})}}
            >
              Guides
            </button>
            <button 
              onClick={() => setActiveTab('udid')} 
              style={{...styles.navButton, ...(activeTab === 'udid' ? styles.navButtonActive : {})}}
            >
              UDID
            </button>
          </nav>

          <div style={styles.headerButtons}>
            <button style={styles.signInButton}>🌟 Sign In</button>
            <button style={styles.getStartedButton}>Get Started</button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={styles.main}>
        {activeTab === 'library' && (
          <LibraryPage 
            apps={filteredApps}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            selectedApp={selectedApp}
            setSelectedApp={setSelectedApp}
            allApps={APPS_DATA}
          />
        )}
        {activeTab === 'signer' && <SignerPage />}
        {activeTab === 'udid' && <UDIDPage />}
        {activeTab === 'guides' && <GuidesPage />}
        {activeTab === 'plans' && <PlansPage />}
        {activeTab === 'icloud' && <ICloudPage />}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <span style={styles.footerLogo}>❄️ frozenhub</span>
            <p style={styles.footerTagline}>Sign and install your favorite iOS apps without jailbreak</p>
          </div>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms of Service</a>
            <a href="#" style={styles.footerLink}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LIBRARY PAGE
// ═══════════════════════════════════════════════════════════════

function LibraryPage({ apps, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories, selectedApp, setSelectedApp, allApps }: any) {
  return (
    <div style={styles.libraryContainer}>
      <div style={styles.libraryHeader}>
        <input
          type="text"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.categoryTabs}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              ...styles.categoryTab,
              ...(selectedCategory === cat ? styles.categoryTabActive : {})
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={styles.appsCount}>
        Showing {apps.length} of {allApps.length} apps
      </div>

      <div style={styles.appGrid}>
        {apps.map((app: any) => (
          <div key={app.id} style={styles.appCard} onClick={() => setSelectedApp(app.id)}>
            <div style={styles.appCardHeader}>
              <div style={styles.appIconLarge}>{app.icon}</div>
              <div style={styles.appCardInfo}>
                <h3 style={styles.appName}>{app.name}</h3>
                <p style={styles.appVersion}>{app.version}</p>
                <p style={styles.appDownloads}>📥 {app.downloads} downloads</p>
              </div>
            </div>
            
            <p style={styles.appDescription}>{app.description}</p>
            
            <div style={styles.appCardFooter}>
              <button 
                style={styles.downloadButton}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = app.downloadLink;
                }}
              >
                Download
              </button>
              <button 
                style={styles.installButton}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = app.installLink;
                }}
              >
                Install
              </button>
            </div>

            <div style={styles.appFeatures}>
              {app.features.map((feature: string, idx: number) => (
                <span key={idx} style={styles.featureTag}>✨ {feature}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SIGNER PAGE
// ═══════════════════════════════════════════════════════════════

function SignerPage() {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>IPA Signer</h1>
        <p style={styles.pageSubtitle}>Sign your IPA files with your own certificate</p>
      </div>

      <div style={styles.signerCard}>
        <div style={styles.uploadSection}>
          <h3 style={styles.sectionTitle}>IPA File</h3>
          <div style={styles.dropZone}>
            <div style={styles.dropZoneContent}>
              <span style={styles.uploadIcon}>📦</span>
              <p style={styles.dropZoneText}>Drop your IPA file here</p>
              <p style={styles.dropZoneSubtext}>or click to browse</p>
            </div>
          </div>
        </div>

        <div style={styles.uploadSection}>
          <h3 style={styles.sectionTitle}>Certificate</h3>
          <div style={styles.certSection}>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>P12 Certificate</label>
              <input type="file" style={styles.fileInput} placeholder="Drop or click to select .p12 file" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Mobile Provision</label>
              <input type="file" style={styles.fileInput} placeholder="Drop or click to select .mobileprovision file" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Certificate Password</label>
              <input type="password" style={styles.textInput} placeholder="Enter certificate password" />
            </div>
          </div>
        </div>

        <button style={styles.signButton}>Sign IPA</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// UDID PAGE
// ═══════════════════════════════════════════════════════════════

function UDIDPage() {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.udidHeader}>
        <h1 style={styles.udidTitle}>Get Device UDID</h1>
        <p style={styles.udidSubtitle}>Find your iPhone or iPad UDID instantly with just a few taps.</p>
        <p style={styles.udidSubtitle}>No computer or iTunes required.</p>
      </div>

      <div style={styles.udidCard}>
        <button style={styles.getUdidButton}>📱 Get UDID</button>
        <p style={styles.udidNote}>Opens in Safari on your iOS device</p>
      </div>

      <div style={styles.howItWorks}>
        <h2 style={styles.howItWorksTitle}>How Does It Work?</h2>
        <p style={styles.howItWorksSubtitle}>Follow these easy steps to get the result with just a few taps! Learn more about the technology.</p>

        <div style={styles.stepsGrid}>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>1</div>
            <div style={styles.stepIcon}>📱</div>
            <h3 style={styles.stepTitle}>Tap "Get UDID" Button</h3>
            <p style={styles.stepDescription}>Open this page on your iOS device in Safari & tap "Get UDID" button. Allow Profile installation.</p>
          </div>

          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>2</div>
            <div style={styles.stepIcon}>⚙️</div>
            <h3 style={styles.stepTitle}>Install the Profile</h3>
            <p style={styles.stepDescription}>Install the downloaded profile. Device Settings → Profile Downloaded → Install</p>
          </div>

          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>3</div>
            <div style={styles.stepIcon}>✅</div>
            <h3 style={styles.stepTitle}>Get Your UDID</h3>
            <p style={styles.stepDescription}>You will be redirected back to this page and see your device UDID.</p>
          </div>
        </div>
      </div>

      <div style={styles.faqSection}>
        <h2 style={styles.faqTitle}>Why frozenhub UDID Finder?</h2>
        <p style={styles.faqSubtitle}>Find out all the essential details about our UDID finder and how it can help you get your device identifier instantly.</p>
        
        <div style={styles.faqItem}>
          <h3 style={styles.faqQuestion}>❄️ What is UDID and why do I need it?</h3>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GUIDES PAGE
// ═══════════════════════════════════════════════════════════════

function GuidesPage() {
  const guides = [
    {
      title: "iosBoom V2 Update",
      date: "22 Dec 2025",
      readTime: "10 min",
      views: "156",
      tags: ["plans", "icloud", "Signer"],
      category: "GENERAL"
    },
    {
      title: "IPA Libraries & Repositories",
      date: "14 Dec 2025",
      readTime: "5 min",
      views: "118",
      tags: ["IPA Signer", "IPA library"],
      category: "GENERAL"
    },
    {
      title: "iosBoom",
      date: "13 Dec 2025",
      readTime: "4 min",
      views: "145",
      tags: ["plans", "Signer"],
      category: "GENERAL"
    },
    {
      title: "Apple Signing Certificates",
      date: "13 Dec 2025",
      readTime: "5 min",
      views: "88",
      tags: ["Apple Developer program"],
      category: "GENERAL"
    },
    {
      title: "esign",
      date: "13 Dec 2025",
      readTime: "5 min",
      views: "136",
      tags: ["Tutorial"],
      category: "GENERAL"
    },
    {
      title: "Feather",
      date: "13 Dec 2025",
      readTime: "5 min",
      views: "23",
      category: "GENERAL"
    },
    {
      title: "Scarlet iOS App Signer: e",
      date: "13 Dec 2025",
      readTime: "6 min",
      views: "67",
      category: "GENERAL"
    }
  ];

  return (
    <div style={styles.pageContainer}>
      <div style={styles.guidesHeader}>
        <h1 style={styles.guidesTitle}>Articles</h1>
        <p style={styles.guidesSubtitle}>Learn everything about ios sideloading</p>
        
        <input
          type="text"
          placeholder="Search articles..."
          style={styles.guidesSearch}
        />

        <div style={styles.guidesCategoryFilter}>
          <button style={{...styles.guidesCategoryBtn, ...styles.guidesCategoryBtnActive}}>
            All
          </button>
          <button style={styles.guidesCategoryBtn}>General</button>
        </div>
      </div>

      <div style={styles.guidesGrid}>
        {guides.map((guide, idx) => (
          <div key={idx} style={styles.guideCard}>
            <div style={styles.guideCategory}>{guide.category}</div>
            <h3 style={styles.guideTitle}>{guide.title}</h3>
            <div style={styles.guideMeta}>
              <span style={styles.guideDate}>📅 {guide.date}</span>
              <span style={styles.guideRead}>⏱️ {guide.readTime}</span>
              <span style={styles.guideViews}>👁️ {guide.views}</span>
            </div>
            {guide.tags && (
              <div style={styles.guideTags}>
                {guide.tags.map((tag, i) => (
                  <span key={i} style={styles.guideTag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PLANS PAGE
// ═══════════════════════════════════════════════════════════════

function PlansPage() {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Choose Your Plan</h1>
        <p style={styles.pageSubtitle}>Select the perfect plan for your needs</p>
      </div>

      <div style={styles.plansGrid}>
        <div style={styles.planCard}>
          <h3 style={styles.planName}>Free</h3>
          <div style={styles.planPrice}>$0<span style={styles.planPeriod}>/month</span></div>
          <ul style={styles.planFeatures}>
            <li style={styles.planFeature}>✓ 3 apps per week</li>
            <li style={styles.planFeature}>✓ Basic support</li>
            <li style={styles.planFeature}>✓ Community access</li>
          </ul>
          <button style={styles.planButton}>Get Started</button>
        </div>

        <div style={{...styles.planCard, ...styles.planCardFeatured}}>
          <div style={styles.planBadge}>POPULAR</div>
          <h3 style={styles.planName}>Pro</h3>
          <div style={styles.planPrice}>$9.99<span style={styles.planPeriod}>/month</span></div>
          <ul style={styles.planFeatures}>
            <li style={styles.planFeature}>✓ Unlimited apps</li>
            <li style={styles.planFeature}>✓ Priority support</li>
            <li style={styles.planFeature}>✓ Custom certificates</li>
            <li style={styles.planFeature}>✓ No ads</li>
          </ul>
          <button style={{...styles.planButton, ...styles.planButtonFeatured}}>Get Started</button>
        </div>

        <div style={styles.planCard}>
          <h3 style={styles.planName}>Enterprise</h3>
          <div style={styles.planPrice}>$29.99<span style={styles.planPeriod}>/month</span></div>
          <ul style={styles.planFeatures}>
            <li style={styles.planFeature}>✓ Everything in Pro</li>
            <li style={styles.planFeature}>✓ Team management</li>
            <li style={styles.planFeature}>✓ API access</li>
            <li style={styles.planFeature}>✓ Dedicated support</li>
          </ul>
          <button style={styles.planButton}>Contact Sales</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ICLOUD PAGE
// ═══════════════════════════════════════════════════════════════

function ICloudPage() {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>iCloud Signing</h1>
        <p style={styles.pageSubtitle}>Sign apps using your iCloud account</p>
      </div>

      <div style={styles.icloudCard}>
        <div style={styles.icloudInfo}>
          <h3 style={styles.icloudTitle}>How it works</h3>
          <p style={styles.icloudText}>Connect your iCloud account to automatically sign and install apps without the need for a computer or certificates.</p>
        </div>

        <div style={styles.icloudForm}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Apple ID</label>
            <input type="email" style={styles.textInput} placeholder="your@email.com" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Password</label>
            <input type="password" style={styles.textInput} placeholder="••••••••" />
          </div>
          <button style={styles.signButton}>Connect iCloud</button>
        </div>

        <div style={styles.icloudWarning}>
          ⚠️ Your credentials are never stored and only used for signing purposes
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e17 0%, #1a1f2e 100%)',
    color: '#e8eaed',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    background: 'rgba(19, 24, 32, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(74, 158, 255, 0.1)',
    position: 'sticky' as 'sticky',
    top: 0,
    zIndex: 1000,
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '24px',
    fontWeight: '700',
    color: '#4a9eff',
  },
  logoIcon: {
    fontSize: '28px',
  },
  logoText: {
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  nav: {
    display: 'flex',
    gap: '8px',
    flex: 1,
    justifyContent: 'center',
  },
  navButton: {
    background: 'transparent',
    border: 'none',
    color: '#9aa0a6',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  navButtonActive: {
    background: 'rgba(74, 158, 255, 0.15)',
    color: '#4a9eff',
  },
  headerButtons: {
    display: 'flex',
    gap: '12px',
  },
  signInButton: {
    background: 'transparent',
    border: '1px solid rgba(74, 158, 255, 0.3)',
    color: '#e8eaed',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  getStartedButton: {
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    border: 'none',
    color: 'white',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  main: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 24px',
    minHeight: 'calc(100vh - 200px)',
  },
  libraryContainer: {
    width: '100%',
  },
  libraryHeader: {
    marginBottom: '24px',
  },
  searchInput: {
    width: '100%',
    maxWidth: '600px',
    padding: '14px 20px',
    background: 'rgba(19, 24, 32, 0.8)',
    border: '2px solid rgba(74, 158, 255, 0.2)',
    borderRadius: '12px',
    color: '#e8eaed',
    fontSize: '15px',
    outline: 'none',
  },
  categoryTabs: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    overflowX: 'auto' as 'auto',
    paddingBottom: '8px',
  },
  categoryTab: {
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.2)',
    color: '#9aa0a6',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap' as 'nowrap',
    transition: 'all 0.3s ease',
  },
  categoryTabActive: {
    background: 'rgba(74, 158, 255, 0.15)',
    borderColor: '#4a9eff',
    color: '#4a9eff',
  },
  appsCount: {
    color: '#9aa0a6',
    fontSize: '14px',
    marginBottom: '20px',
  },
  appGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  appCard: {
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.15)',
    borderRadius: '16px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  appCardHeader: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
  },
  appIconLarge: {
    width: '64px',
    height: '64px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    flexShrink: 0,
  },
  appCardInfo: {
    flex: 1,
  },
  appName: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '4px',
    color: '#e8eaed',
  },
  appVersion: {
    fontSize: '13px',
    color: '#9aa0a6',
    marginBottom: '4px',
  },
  appDownloads: {
    fontSize: '12px',
    color: '#64b5f6',
  },
  appDescription: {
    fontSize: '14px',
    color: '#9aa0a6',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
  appCardFooter: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px',
  },
  downloadButton: {
    flex: 1,
    padding: '12px',
    background: 'rgba(74, 158, 255, 0.1)',
    border: '1px solid rgba(74, 158, 255, 0.3)',
    borderRadius: '10px',
    color: '#4a9eff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  installButton: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  appFeatures: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    gap: '8px',
  },
  featureTag: {
    fontSize: '11px',
    padding: '4px 10px',
    background: 'rgba(74, 158, 255, 0.1)',
    border: '1px solid rgba(74, 158, 255, 0.2)',
    borderRadius: '6px',
    color: '#64b5f6',
  },
  pageContainer: {
    width: '100%',
  },
  pageHeader: {
    textAlign: 'center' as 'center',
    marginBottom: '48px',
  },
  pageTitle: {
    fontSize: '42px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '12px',
  },
  pageSubtitle: {
    fontSize: '18px',
    color: '#9aa0a6',
  },
  signerCard: {
    maxWidth: '700px',
    margin: '0 auto',
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.15)',
    borderRadius: '20px',
    padding: '32px',
  },
  uploadSection: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#e8eaed',
  },
  dropZone: {
    border: '2px dashed rgba(74, 158, 255, 0.3)',
    borderRadius: '16px',
    padding: '48px 24px',
    textAlign: 'center' as 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  dropZoneContent: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    gap: '12px',
  },
  uploadIcon: {
    fontSize: '48px',
  },
  dropZoneText: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#e8eaed',
  },
  dropZoneSubtext: {
    fontSize: '14px',
    color: '#9aa0a6',
  },
  certSection: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '8px',
  },
  inputLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#9aa0a6',
  },
  fileInput: {
    padding: '12px 16px',
    background: 'rgba(26, 31, 46, 0.6)',
    border: '1px solid rgba(74, 158, 255, 0.2)',
    borderRadius: '10px',
    color: '#e8eaed',
    fontSize: '14px',
    cursor: 'pointer',
  },
  textInput: {
    padding: '12px 16px',
    background: 'rgba(26, 31, 46, 0.6)',
    border: '1px solid rgba(74, 158, 255, 0.2)',
    borderRadius: '10px',
    color: '#e8eaed',
    fontSize: '14px',
    outline: 'none',
  },
  signButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  udidHeader: {
    textAlign: 'center' as 'center',
    marginBottom: '48px',
  },
  udidTitle: {
    fontSize: '48px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
  },
  udidSubtitle: {
    fontSize: '18px',
    color: '#9aa0a6',
    marginBottom: '8px',
  },
  udidCard: {
    maxWidth: '500px',
    margin: '0 auto 64px',
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.15)',
    borderRadius: '20px',
    padding: '48px 32px',
    textAlign: 'center' as 'center',
  },
  getUdidButton: {
    padding: '18px 48px',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '16px',
  },
  udidNote: {
    fontSize: '13px',
    color: '#9aa0a6',
  },
  howItWorks: {
    marginBottom: '64px',
  },
  howItWorksTitle: {
    fontSize: '32px',
    fontWeight: '700',
    textAlign: 'center' as 'center',
    marginBottom: '12px',
    color: '#e8eaed',
  },
  howItWorksSubtitle: {
    fontSize: '16px',
    textAlign: 'center' as 'center',
    color: '#9aa0a6',
    marginBottom: '48px',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  stepCard: {
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.15)',
    borderRadius: '16px',
    padding: '32px 24px',
    textAlign: 'center' as 'center',
    position: 'relative' as 'relative',
  },
  stepNumber: {
    position: 'absolute' as 'absolute',
    top: '16px',
    right: '16px',
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
    color: 'white',
  },
  stepIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#e8eaed',
  },
  stepDescription: {
    fontSize: '14px',
    color: '#9aa0a6',
    lineHeight: '1.6',
  },
  faqSection: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  faqTitle: {
    fontSize: '32px',
    fontWeight: '700',
    textAlign: 'center' as 'center',
    marginBottom: '12px',
    color: '#e8eaed',
  },
  faqSubtitle: {
    fontSize: '16px',
    textAlign: 'center' as 'center',
    color: '#9aa0a6',
    marginBottom: '32px',
  },
  faqItem: {
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.15)',
    borderRadius: '12px',
    padding: '20px 24px',
    marginBottom: '16px',
  },
  faqQuestion: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#e8eaed',
  },
  guidesHeader: {
    textAlign: 'center' as 'center',
    marginBottom: '48px',
  },
  guidesTitle: {
    fontSize: '48px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '12px',
  },
  guidesSubtitle: {
    fontSize: '18px',
    color: '#9aa0a6',
    marginBottom: '32px',
  },
  guidesSearch: {
    width: '100%',
    maxWidth: '600px',
    padding: '14px 20px',
    background: 'rgba(19, 24, 32, 0.8)',
    border: '2px solid rgba(74, 158, 255, 0.2)',
    borderRadius: '12px',
    color: '#e8eaed',
    fontSize: '15px',
    outline: 'none',
    margin: '0 auto 24px',
    display: 'block',
  },
  guidesCategoryFilter: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  guidesCategoryBtn: {
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.2)',
    color: '#9aa0a6',
    padding: '10px 24px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  guidesCategoryBtnActive: {
    background: 'rgba(74, 158, 255, 0.15)',
    borderColor: '#4a9eff',
    color: '#4a9eff',
  },
  guidesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  guideCard: {
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.15)',
    borderRadius: '16px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  guideCategory: {
    display: 'inline-block',
    padding: '4px 12px',
    background: 'rgba(74, 158, 255, 0.1)',
    border: '1px solid rgba(74, 158, 255, 0.3)',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#4a9eff',
    marginBottom: '12px',
  },
  guideTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#e8eaed',
    marginBottom: '16px',
  },
  guideMeta: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    color: '#9aa0a6',
    marginBottom: '12px',
  },
  guideDate: {},
  guideRead: {},
  guideViews: {},
  guideTags: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    gap: '8px',
  },
  guideTag: {
    fontSize: '11px',
    padding: '4px 10px',
    background: 'rgba(100, 181, 246, 0.1)',
    border: '1px solid rgba(100, 181, 246, 0.2)',
    borderRadius: '6px',
    color: '#64b5f6',
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  planCard: {
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.15)',
    borderRadius: '20px',
    padding: '32px',
    textAlign: 'center' as 'center',
    position: 'relative' as 'relative',
  },
  planCardFeatured: {
    border: '2px solid #4a9eff',
    transform: 'scale(1.05)',
  },
  planBadge: {
    position: 'absolute' as 'absolute',
    top: '16px',
    right: '16px',
    padding: '4px 12px',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
    color: 'white',
  },
  planName: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#e8eaed',
  },
  planPrice: {
    fontSize: '42px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '24px',
  },
  planPeriod: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#9aa0a6',
  },
  planFeatures: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '32px',
    textAlign: 'left' as 'left',
  },
  planFeature: {
    fontSize: '15px',
    color: '#9aa0a6',
    marginBottom: '12px',
    paddingLeft: '8px',
  },
  planButton: {
    width: '100%',
    padding: '14px',
    background: 'rgba(74, 158, 255, 0.1)',
    border: '1px solid rgba(74, 158, 255, 0.3)',
    borderRadius: '10px',
    color: '#4a9eff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  planButtonFeatured: {
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    border: 'none',
    color: 'white',
  },
  icloudCard: {
    maxWidth: '600px',
    margin: '0 auto',
    background: 'rgba(19, 24, 32, 0.8)',
    border: '1px solid rgba(74, 158, 255, 0.15)',
    borderRadius: '20px',
    padding: '32px',
  },
  icloudInfo: {
    marginBottom: '32px',
    textAlign: 'center' as 'center',
  },
  icloudTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#e8eaed',
  },
  icloudText: {
    fontSize: '15px',
    color: '#9aa0a6',
    lineHeight: '1.6',
  },
  icloudForm: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '20px',
    marginBottom: '24px',
  },
  icloudWarning: {
    padding: '16px',
    background: 'rgba(255, 193, 7, 0.1)',
    border: '1px solid rgba(255, 193, 7, 0.3)',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#ffc107',
    textAlign: 'center' as 'center',
  },
  footer: {
    background: 'rgba(19, 24, 32, 0.95)',
    borderTop: '1px solid rgba(74, 158, 255, 0.1)',
    padding: '48px 24px',
  },
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '32px',
  },
  footerBrand: {
    flex: 1,
  },
  footerLogo: {
    fontSize: '20px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'block',
    marginBottom: '8px',
  },
  footerTagline: {
    fontSize: '14px',
    color: '#9aa0a6',
  },
  footerLinks: {
    display: 'flex',
    gap: '24px',
  },
  footerLink: {
    color: '#9aa0a6',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s ease',
  },
};
