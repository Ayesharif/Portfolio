/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  authAPI,
  profileAPI,
  experienceAPI,
  projectAPI,
  skillAPI,
  certificationAPI,
  educationAPI,
  messageAPI,
  seedAPI
} from '../services/api';

const DEFAULT_PIN = 'admin123';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    profile: null,
    experiences: [],
    skills: [],
    projects: [],
    certifications: [],
    education: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [adminPin, setAdminPin] = useState(DEFAULT_PIN);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('ayesh_admin_auth') === 'true';
  });

  // Fetch all inbox messages (admin only)
  const fetchMessages = useCallback(async () => {
    try {
      const res = await messageAPI.getAll();
      if (res?.success && Array.isArray(res?.data)) {
        setMessages(res.data);
      }
    } catch {
      // Unauthenticated or offline
    }
  }, []);

  // Fetch all live data directly from MongoDB backend
  const loadPortfolioData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Check current authenticated admin user
      try {
        const meRes = await authAPI.getMe();
        if (meRes?.success && meRes?.user) {
          setCurrentUser(meRes.user);
          setIsAdminAuthenticated(true);
          sessionStorage.setItem('ayesh_admin_auth', 'true');
        }
      } catch {
        // Not currently logged in
      }

      // 2. Fetch all collections from backend API
      const [profRes, expRes, projRes, skillRes, certRes, eduRes] = await Promise.allSettled([
        profileAPI.get(),
        experienceAPI.getAll(),
        projectAPI.getAll(),
        skillAPI.getAll(),
        certificationAPI.getAll(),
        educationAPI.getAll()
      ]);

      const profileData =
        profRes.status === 'fulfilled' && profRes.value?.data
          ? profRes.value.data
          : null;

      const experiencesData =
        expRes.status === 'fulfilled' && Array.isArray(expRes.value?.data)
          ? expRes.value.data.map((item) => ({ ...item, id: item._id || item.id }))
          : [];

      const projectsData =
        projRes.status === 'fulfilled' && Array.isArray(projRes.value?.data)
          ? projRes.value.data.map((item) => ({ ...item, id: item._id || item.id }))
          : [];

      const skillsData =
        skillRes.status === 'fulfilled' && Array.isArray(skillRes.value?.data)
          ? skillRes.value.data.map((item) => ({ ...item, id: item._id || item.id }))
          : [];

      const certificationsData =
        certRes.status === 'fulfilled' && Array.isArray(certRes.value?.data)
          ? certRes.value.data.map((item) => ({ ...item, id: item._id || item.id }))
          : [];

      const educationData =
        eduRes.status === 'fulfilled' && Array.isArray(eduRes.value?.data)
          ? eduRes.value.data.map((item) => ({ ...item, id: item._id || item.id }))
          : [];

      setData({
        profile: profileData,
        experiences: experiencesData,
        projects: projectsData,
        skills: skillsData,
        certifications: certificationsData,
        education: educationData
      });

      setIsBackendConnected(true);
    } catch (err) {
      console.error('Failed to load portfolio data from backend:', err);
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load from backend API
  useEffect(() => {
    loadPortfolioData();
  }, [loadPortfolioData]);

  // Sync messages whenever admin authentication state changes
  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchMessages();
    }
  }, [isAdminAuthenticated, fetchMessages]);

  // ----------------- Profile Actions -----------------
  const updateProfile = async (updatedProfile) => {
    const res = await profileAPI.update(updatedProfile);
    if (res?.data) {
      setData((prev) => ({ ...prev, profile: res.data }));
    }
    return res;
  };

  // ----------------- Experience Actions -----------------
  const addExperience = async (experience) => {
    const res = await experienceAPI.create(experience);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        experiences: [item, ...prev.experiences]
      }));
    }
    return res;
  };

  const updateExperience = async (id, updatedExp) => {
    const res = await experienceAPI.update(id, updatedExp);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp) =>
          exp.id === id || exp._id === id ? item : exp
        )
      }));
    }
    return res;
  };

  const deleteExperience = async (id) => {
    await experienceAPI.delete(id);
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id && exp._id !== id)
    }));
  };

  // ----------------- Skill Actions -----------------
  const addSkill = async (skill) => {
    const res = await skillAPI.create(skill);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        skills: [...prev.skills, item]
      }));
    }
    return res;
  };

  const updateSkill = async (id, updatedSkill) => {
    const res = await skillAPI.update(id, updatedSkill);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        skills: prev.skills.map((s) => (s.id === id || s._id === id ? item : s))
      }));
    }
    return res;
  };

  const deleteSkill = async (id) => {
    await skillAPI.delete(id);
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id && s._id !== id)
    }));
  };

  // ----------------- Project Actions -----------------
  const addProject = async (project) => {
    const res = await projectAPI.create(project);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        projects: [item, ...prev.projects]
      }));
    }
    return res;
  };

  const updateProject = async (id, updatedProject) => {
    const res = await projectAPI.update(id, updatedProject);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) => (p.id === id || p._id === id ? item : p))
      }));
    }
    return res;
  };

  const deleteProject = async (id) => {
    await projectAPI.delete(id);
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id && p._id !== id)
    }));
  };

  // ----------------- Certification Actions -----------------
  const addCertification = async (cert) => {
    const res = await certificationAPI.create(cert);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        certifications: [item, ...prev.certifications]
      }));
    }
    return res;
  };

  const updateCertification = async (id, updatedCert) => {
    const res = await certificationAPI.update(id, updatedCert);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        certifications: prev.certifications.map((c) =>
          c.id === id || c._id === id ? item : c
        )
      }));
    }
    return res;
  };

  const deleteCertification = async (id) => {
    await certificationAPI.delete(id);
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id && c._id !== id)
    }));
  };

  // ----------------- Education Actions -----------------
  const addEducation = async (edu) => {
    const res = await educationAPI.create(edu);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        education: [item, ...prev.education]
      }));
    }
    return res;
  };

  const updateEducation = async (id, updatedEdu) => {
    const res = await educationAPI.update(id, updatedEdu);
    if (res?.data) {
      const item = { ...res.data, id: res.data._id || res.data.id };
      setData((prev) => ({
        ...prev,
        education: prev.education.map((e) =>
          e.id === id || e._id === id ? item : e
        )
      }));
    }
    return res;
  };

  const deleteEducation = async (id) => {
    await educationAPI.delete(id);
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id && e._id !== id)
    }));
  };

  // ----------------- Contact / Messages -----------------
  const sendMessage = async (messageData) => {
    const res = await messageAPI.send(messageData);
    return res;
  };

  const markMessageAsRead = async (id, isRead = true) => {
    setMessages((prev) =>
      prev.map((msg) => (msg._id === id ? { ...msg, isRead } : msg))
    );
    try {
      await messageAPI.markAsRead(id, isRead);
    } catch (err) {
      console.warn('Failed to update message read status:', err.message);
    }
  };

  const deleteMessage = async (id) => {
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
    try {
      await messageAPI.delete(id);
    } catch (err) {
      console.warn('Failed to delete message:', err.message);
    }
  };

  // ----------------- Database & Seed Operations -----------------
  const resetToDefaults = async () => {
    try {
      await seedAPI.seedDatabase();
      await loadPortfolioData();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const seedBackend = async () => {
    try {
      const res = await seedAPI.seedDatabase();
      await loadPortfolioData();
      return { success: true, message: res.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // ----------------- JSON Export & Import -----------------
  const exportDataJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `muhammad-ayesh-portfolio-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJSON = async (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON format');
      if (parsed.profile) await profileAPI.update(parsed.profile);
      await loadPortfolioData();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // ----------------- Authentication -----------------
  const loginWithBackend = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      if (res.success) {
        setIsAdminAuthenticated(true);
        setCurrentUser(res.user);
        sessionStorage.setItem('ayesh_admin_auth', 'true');
        await fetchMessages();
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const registerWithBackend = async (name, email, password) => {
    try {
      const res = await authAPI.register({ name, email, password });
      if (res.success) {
        setIsAdminAuthenticated(true);
        setCurrentUser(res.user);
        sessionStorage.setItem('ayesh_admin_auth', 'true');
        await fetchMessages();
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const authenticateAdmin = (pin) => {
    if (pin === adminPin) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('ayesh_admin_auth', 'true');
      fetchMessages();
      return true;
    }
    return false;
  };

  const logoutAdmin = async () => {
    try {
      await authAPI.logout();
    } catch {
      // Logout cleanup
    }
    setIsAdminAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem('ayesh_admin_auth');
  };

  const updateAdminPinCode = (newPin) => {
    setAdminPin(newPin);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        profile: data.profile,
        experiences: data.experiences,
        skills: data.skills,
        projects: data.projects,
        certifications: data.certifications,
        education: data.education,
        messages,
        isLoading,
        isBackendConnected,
        loadPortfolioData,
        fetchMessages,
        sendMessage,
        markMessageAsRead,
        deleteMessage,
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
        adminPin,
        updateAdminPinCode
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
