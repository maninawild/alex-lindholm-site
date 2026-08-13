export type PrivatePageId = "jewish" | (string & {});

export type PrivatePageDefinition = {
  id: PrivatePageId;
  slug: string;
  title: string;
  subtitle: string;
};

export type PrivateAccessCode = {
  id: string;
  label: string;
  salt: string;
  hash: string;
  pages: "*" | PrivatePageId[];
  revoked?: boolean;
};

export type PrivateSession = {
  codeId: string;
  label: string;
  pages: "*" | PrivatePageId[];
  issuedAt: number;
  expiresAt: number;
};
