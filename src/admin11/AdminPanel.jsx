import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

import Toast from "./components/Toast";
import AuthGateway from "./components/AuthGateway";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

import ProfileTab from "./tabs/ProfileTab";
import MessagesTab from "./tabs/MessagesTab";
import ExperienceTab from "./tabs/ExperienceTab";
import ProjectsTab from "./tabs/ProjectsTab";
import SkillsTab from "./tabs/SkillsTab";
import CertificationsTab from "./tabs/CertificationsTab";
import EducationTab from "./tabs/EducationTab";
import SettingsTab from "./tabs/SettingsTab";

import ItemModal from "./modals/ItemModal";

export default function AdminPanel() {
  const {
    profile,
    experiences,
    skills,
    projects,
    certifications,
    education,
    updateProfile,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    addEducation,
    updateEducation,
    deleteEducation,
    resetToDefaults,
    seedBackend,
    exportDataJSON,
    importDataJSON,
    isAdminAuthenticated,
    currentUser,
    loginWithBackend,
    registerWithBackend,
    authenticateAdmin,
    logoutAdmin,
    updateAdminPinCode,
    isBackendConnected,
    messages,
    fetchMessages,
    markMessageAsRead,
    deleteMessage
  } = usePortfolio();

  // Auth form states
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register' | 'pin'
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("Muhammad Ayesh");
  const [enteredPin, setEnteredPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Admin tabs & feedback
  const [activeTab, setActiveTab] = useState("profile");
  const [toastMessage, setToastMessage] = useState(null);

  // Modals & form states
  const [editingItem, setEditingItem] = useState(null); // { type, isNew, data }
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Profile form local state
  const [profileForm, setProfileForm] = useState(profile || {});

  // PIN change state
  const [newPinCode, setNewPinCode] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError("");

    const res = await loginWithBackend(loginEmail, loginPassword);
    setIsAuthLoading(false);

    if (res.success) {
      setProfileForm(profile);
      showToast(`Welcome back, ${res.user?.name || "Muhammad Ayesh"}!`);
    } else {
      setAuthError(res.message || "Invalid email or password.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError("");

    const res = await registerWithBackend(registerName, loginEmail, loginPassword);
    setIsAuthLoading(false);

    if (res.success) {
      setProfileForm(profile);
      showToast("Account created and logged in successfully!");
    } else {
      setAuthError(res.message || "Registration failed.");
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (authenticateAdmin(enteredPin)) {
      setAuthError("");
      setEnteredPin("");
      setProfileForm(profile);
      showToast("Admin access unlocked via PIN.");
    } else {
      setAuthError("Incorrect PIN. Please try again.");
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast("Profile details updated successfully!");
  };

  const getEmptyItem = (type) => {
    switch (type) {
      case "experience":
        return {
          role: "",
          company: "",
          location: "Remote",
          period: "2024 - Present",
          type: "Full-Time",
          description: "",
          achievements: [""],
          technologies: ["React.js", "Node.js"]
        };
      case "project":
        return {
          title: "",
          category: "Full Stack",
          featured: false,
          description: "",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
          tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
          liveUrl: "",
          githubUrl: ""
        };
      case "skill":
        return {
          name: "",
          category: "Frontend",
          level: 85
        };
      case "certification":
        return {
          title: "",
          issuer: "",
          date: new Date().getFullYear().toString(),
          credentialId: "",
          credentialUrl: "",
          description: ""
        };
      case "education":
        return {
          degree: "",
          institution: "",
          location: "Lahore, Pakistan",
          period: "2020 - 2024",
          grade: "",
          description: "",
          highlights: [""]
        };
      default:
        return {};
    }
  };

  const openItemModal = (type, item = null) => {
    setEditingItem({
      type,
      isNew: !item,
      data: item ? JSON.parse(JSON.stringify(item)) : getEmptyItem(type)
    });
    setIsModalOpen(true);
  };

  const saveModalItem = (e) => {
    e.preventDefault();
    const { type, isNew, data: itemData } = editingItem;

    if (type === "experience") {
      if (isNew) addExperience(itemData);
      else updateExperience(itemData.id, itemData);
    } else if (type === "project") {
      if (isNew) addProject(itemData);
      else updateProject(itemData.id, itemData);
    } else if (type === "skill") {
      if (isNew) addSkill(itemData);
      else updateSkill(itemData.id, itemData);
    } else if (type === "certification") {
      if (isNew) addCertification(itemData);
      else updateCertification(itemData.id, itemData);
    } else if (type === "education") {
      if (isNew) addEducation(itemData);
      else updateEducation(itemData.id, itemData);
    }

    setIsModalOpen(false);
    setEditingItem(null);
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully!`);
  };

  const handleJsonImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importDataJSON(event.target.result);
      if (res.success) {
        showToast("Data imported successfully!");
      } else {
        alert("Import failed: " + res.error);
      }
    };
    reader.readAsText(file);
  };

  // If not authenticated, show modern Auth Gateway
  if (!isAdminAuthenticated) {
    return (
      <AuthGateway
        authMode={authMode}
        setAuthMode={setAuthMode}
        authError={authError}
        setAuthError={setAuthError}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        registerName={registerName}
        setRegisterName={setRegisterName}
        enteredPin={enteredPin}
        setEnteredPin={setEnteredPin}
        isAuthLoading={isAuthLoading}
        handleEmailLogin={handleEmailLogin}
        handleRegister={handleRegister}
        handlePinSubmit={handlePinSubmit}
      />
    );
  }

  // Logged-in Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">

      <Toast message={toastMessage} />

      <AdminHeader
        isBackendConnected={isBackendConnected}
        currentUser={currentUser}
        profile={profile}
        logoutAdmin={logoutAdmin}
      />

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          messages={messages}
          experiences={experiences}
          projects={projects}
          skills={skills}
          certifications={certifications}
          education={education}
        />

        {/* Content Area (9 cols) */}
        <div className="lg:col-span-9">

          {activeTab === "profile" && (
            <ProfileTab
              profileForm={profileForm}
              setProfileForm={setProfileForm}
              handleProfileSave={handleProfileSave}
            />
          )}

          {activeTab === "messages" && (
            <MessagesTab
              messages={messages}
              fetchMessages={fetchMessages}
              markMessageAsRead={markMessageAsRead}
              deleteMessage={deleteMessage}
              showToast={showToast}
            />
          )}

          {activeTab === "experience" && (
            <ExperienceTab
              experiences={experiences}
              openItemModal={openItemModal}
              deleteExperience={deleteExperience}
              showToast={showToast}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsTab
              projects={projects}
              openItemModal={openItemModal}
              deleteProject={deleteProject}
              showToast={showToast}
            />
          )}

          {activeTab === "skills" && (
            <SkillsTab
              skills={skills}
              openItemModal={openItemModal}
              deleteSkill={deleteSkill}
              showToast={showToast}
            />
          )}

          {activeTab === "certifications" && (
            <CertificationsTab
              certifications={certifications}
              openItemModal={openItemModal}
              deleteCertification={deleteCertification}
              showToast={showToast}
            />
          )}

          {activeTab === "education" && (
            <EducationTab
              education={education}
              openItemModal={openItemModal}
              deleteEducation={deleteEducation}
              showToast={showToast}
            />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              seedBackend={seedBackend}
              exportDataJSON={exportDataJSON}
              handleJsonImport={handleJsonImport}
              newPinCode={newPinCode}
              setNewPinCode={setNewPinCode}
              updateAdminPinCode={updateAdminPinCode}
              resetToDefaults={resetToDefaults}
              profile={profile}
              setProfileForm={setProfileForm}
              showToast={showToast}
            />
          )}

        </div>

      </div>

      <ItemModal
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        saveModalItem={saveModalItem}
      />

    </div>
  );
}
