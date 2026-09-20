import type { Member } from '@/lib/types/member';

/**
 * STRUCTURED PLACEHOLDER DATA ONLY
 * DO NOT use as final real-world committee data.
 * Real member records will be imported in a subsequent phase.
 */
export const placeholderMembers: Member[] = [
  {
    memberId: 'IEI-GST-2025-001',
    name: 'Sample Executive Member',
    designation: 'President [Placeholder]',
    department: 'Computer Engineering',
    year: 'Final Year (BE)',
    session: '2024-2025',
    bio: 'Placeholder profile structure representing the chapter leadership council. Real member profile details will be populated in the upcoming phase.',
    photo: '',
    email: 'president.iei@siesgst.ac.in',
    status: 'active',
    visibility: 'public',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    verification: {
      isVerified: true,
      verifiedAt: '2024-08-15T10:00:00Z',
      badgeType: 'Executive',
      signatureHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      issuer: 'IEI SIES GST Council',
      credentialId: 'CRED-2024-001',
    },
    metadata: {
      joinDate: '2023-08-01',
      termSession: '2024-2025',
      chapterBranch: 'SIES GST Student Chapter (ECS)',
      rolesHeld: ['Technical Lead (2023)', 'President (2024)'],
    },
  },
  {
    memberId: 'IEI-GST-2025-042',
    name: 'Sample Technical Lead',
    designation: 'Technical Head [Placeholder]',
    department: 'Information Technology',
    year: 'Third Year (TE)',
    session: '2024-2025',
    bio: 'Placeholder profile structure representing technical wing leadership. Real profile information will be connected via the official roster.',
    photo: '',
    email: 'techhead.iei@siesgst.ac.in',
    status: 'active',
    visibility: 'public',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    verification: {
      isVerified: true,
      verifiedAt: '2024-09-01T14:30:00Z',
      badgeType: 'Technical Lead',
      signatureHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
      issuer: 'IEI SIES GST Council',
      credentialId: 'CRED-2024-042',
    },
    metadata: {
      joinDate: '2023-09-10',
      termSession: '2024-2025',
      chapterBranch: 'SIES GST Student Chapter (ECS)',
    },
  },
  {
    memberId: 'IEI-GST-2025-002',
    name: 'Sample Vice President',
    designation: 'Vice President [Placeholder]',
    department: 'Electronics & Computer Science',
    year: 'Final Year (BE)',
    session: '2024-2025',
    bio: 'Placeholder profile structure representing the chapter vice president. Coordinates inter-department initiatives and institutional partnerships.',
    photo: '',
    email: 'vicepresident.iei@siesgst.ac.in',
    status: 'active',
    visibility: 'public',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    verification: {
      isVerified: true,
      verifiedAt: '2024-08-15T10:00:00Z',
      badgeType: 'Executive',
      signatureHash: '4a6b2c9d0e1f3a5b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      issuer: 'IEI SIES GST Council',
      credentialId: 'CRED-2024-002',
    },
    metadata: {
      joinDate: '2023-08-01',
      termSession: '2024-2025',
      chapterBranch: 'SIES GST Student Chapter (ECS)',
      rolesHeld: ['Event Lead (2023)', 'Vice President (2024)'],
    },
  },
  {
    memberId: 'IEI-GST-2025-003',
    name: 'Sample General Secretary',
    designation: 'Secretary [Placeholder]',
    department: 'Electronics & Telecommunication',
    year: 'Third Year (TE)',
    session: '2024-2025',
    bio: 'Placeholder profile structure representing chapter administration and secretariat affairs. Oversees communications and official documentation.',
    photo: '',
    email: 'secretary.iei@siesgst.ac.in',
    status: 'active',
    visibility: 'public',
    socialLinks: {
      linkedin: 'https://linkedin.com',
    },
    verification: {
      isVerified: true,
      verifiedAt: '2024-08-20T11:00:00Z',
      badgeType: 'Core Council',
      signatureHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      issuer: 'IEI SIES GST Council',
      credentialId: 'CRED-2024-003',
    },
    metadata: {
      joinDate: '2023-08-15',
      termSession: '2024-2025',
      chapterBranch: 'SIES GST Student Chapter (ECS)',
    },
  },
];

export function getMemberById(memberId: string): Member | undefined {
  const normalized = memberId.trim().toUpperCase();
  return placeholderMembers.find((m) => m.memberId.toUpperCase() === normalized);
}

export function getAllMembers(): Member[] {
  return placeholderMembers;
}
