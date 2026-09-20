export type MemberStatus = 'active' | 'alumni' | 'emeritus' | 'suspended';

export type MemberVisibility = 'public' | 'unlisted' | 'private';

export type MemberBadgeType = 
  | 'Executive'
  | 'Core Council'
  | 'Technical Lead'
  | 'Technical Member'
  | 'Faculty Advisor'
  | 'General Member';

export interface MemberVerification {
  isVerified: boolean;
  verifiedAt: string;
  badgeType: MemberBadgeType;
  signatureHash: string;
  issuer: string;
  credentialId: string;
}

export interface MemberSocialLinks {
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  email?: string;
}

export interface MemberMetadata {
  joinDate: string;
  termSession: string;
  chapterBranch: string;
  rolesHeld?: string[];
  achievements?: string[];
}

export interface Member {
  memberId: string; // Structured ID e.g. IEI-GST-2025-001
  name: string;
  designation: string;
  department: string;
  year: string; // e.g., 'Third Year (TE)', 'Final Year (BE)'
  session: string; // e.g., '2024-2025'
  bio: string;
  photo?: string;
  email: string;
  status: MemberStatus;
  visibility: MemberVisibility;
  socialLinks: MemberSocialLinks;
  verification: MemberVerification;
  metadata: MemberMetadata;
}
