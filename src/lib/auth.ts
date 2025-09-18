import { account } from '@/lib/appwrite';
import { config } from '@/lib/appwrite';
import { Models } from 'appwrite';
import { ID } from 'appwrite';

export interface AuthUser {
  $id: string;
  name: string;
  email: string;
  emailVerification: boolean;
  registration: string;
  status: boolean;
  labels: string[];
  prefs: Record<string, any>;
}

class AppwriteAuthService {
  // Sign up with email and password
  async signUp(email: string, password: string, name?: string): Promise<Models.User<Models.Preferences>> {
    try {
      const response = await account.create(ID.unique(), email, password, name);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<Models.Session> {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Sign out (delete current session)
  async signOut(): Promise<void> {
    try {
      await account.deleteSession('current');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Sign out from all devices
  async signOutAll(): Promise<void> {
    try {
      await account.deleteSessions();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get current user
  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return null;
    }
  }

  // Get current session
  async getCurrentSession(): Promise<Models.Session | null> {
    try {
      const session = await account.getSession('current');
      return session;
    } catch (error) {
      return null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      await account.get();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Send verification email
  async sendVerificationEmail(): Promise<Models.Token> {
    try {
      const url = `${config.authDomain}/auth/verify-email`;
      const response = await account.createVerification(url);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Confirm email verification
  async confirmEmailVerification(userId: string, secret: string): Promise<Models.Token> {
    try {
      const response = await account.updateVerification(userId, secret);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email: string): Promise<Models.Token> {
    try {
      const response = await account.createRecovery(email, config.getPasswordResetUrl());
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Confirm password reset
  async confirmPasswordReset(userId: string, secret: string, password: string): Promise<Models.Token> {
    try {
      const response = await account.updateRecovery(userId, secret, password);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user name
  async updateName(name: string): Promise<Models.User<Models.Preferences>> {
    try {
      const response = await account.updateName(name);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user email
  async updateEmail(email: string, password: string): Promise<Models.User<Models.Preferences>> {
    try {
      const response = await account.updateEmail(email, password);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user password
  async updatePassword(newPassword: string, oldPassword: string): Promise<Models.User<Models.Preferences>> {
    try {
      const response = await account.updatePassword(newPassword, oldPassword);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create OAuth2 session URL - redirects to WhyWire dashboard after success
  createOAuth2Session(provider: string): void {
    try {
      // For static export, we use direct redirect to Appwrite OAuth
      // The success URL will be handled by Appwrite directly
      account.createOAuth2Session(
        provider as any,
        config.getSuccessRedirectUrl(), // Redirect to dashboard.whywire.app
        `${config.authDomain}/auth/error` // Error page on auth.whywire.app
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create magic URL session
  async createMagicURLSession(email: string): Promise<Models.Token> {
    try {
      const response = await account.createMagicURLToken(
        ID.unique(),
        email,
        config.getMagicLinkUrl()
      );
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create session from magic URL
  async createSessionFromMagicURL(userId: string, secret: string): Promise<Models.Session> {
    try {
      const response = await account.createSession(userId, secret);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all sessions
  async getAllSessions(): Promise<Models.SessionList> {
    try {
      const response = await account.listSessions();
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user preferences
  async updatePreferences(prefs: Record<string, any>): Promise<Models.User<Models.Preferences>> {
    try {
      const response = await account.updatePrefs(prefs);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user preferences
  async getPreferences(): Promise<Models.Preferences> {
    try {
      const response = await account.getPrefs();
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle and format errors
  private handleError(error: any): Error {
    if (error.code && error.message) {
      return new Error(`${error.code}: ${error.message}`);
    }
    return new Error(error.message || 'An unknown error occurred');
  }
}

// Export a singleton instance
export const authService = new AppwriteAuthService();