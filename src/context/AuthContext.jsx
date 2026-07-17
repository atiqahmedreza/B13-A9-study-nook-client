import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth, googleProvider } from '../services/firebase';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

const syncWithBackend = async (firebaseUser) => {
  const payload = {
    name: firebaseUser.displayName || 'StudyNook User',
    email: firebaseUser.email,
    photoURL:
      firebaseUser.photoURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        firebaseUser.displayName || firebaseUser.email
      )}&background=0D9488&color=fff`,
    firebaseUid: firebaseUser.uid,
  };

  const { data } = await authAPI.login(payload);
  return data.data.user;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const backendUser = await syncWithBackend(firebaseUser);
          setUser(backendUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const register = useCallback(async ({ name, email, password, photoURL }) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name, photoURL });
    await authAPI.register({
      name,
      email,
      photoURL,
      firebaseUid: credential.user.uid,
    });
    await signOut(auth);
    await authAPI.logout().catch(() => {});
    setUser(null);
    toast.success('Registration successful! Please login.');
  }, []);

  const login = useCallback(async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const backendUser = await syncWithBackend(credential.user);
    setUser(backendUser);
    toast.success('Welcome back!');
    return backendUser;
  }, []);

  const googleLogin = useCallback(async () => {
    const provider = googleProvider || new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    const backendUser = await syncWithBackend(credential.user);
    setUser(backendUser);
    toast.success('Signed in with Google');
    return backendUser;
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    await authAPI.logout().catch(() => {});
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      register,
      login,
      googleLogin,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, loading, register, login, googleLogin, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
