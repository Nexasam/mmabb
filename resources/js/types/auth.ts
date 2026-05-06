export type User = {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
    isAdmin: boolean;
    hasApprovedApplication: boolean;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export type Course = {
    id: number;
    title: string;
    slug: string;
    description: string;
    overview: string | null;
    learning_objectives: string[] | null;
    curriculum: CurriculumDay[] | null;
    accreditation: string | null;
    duration: string | null;
    location: string | null;
    price: string | null;
    is_active: boolean;
};

export type CurriculumDay = {
    day: string;
    title: string;
    topics: string[];
};

export type Application = {
    id: number;
    user_id: number | null;
    course_id: number;
    full_name: string;
    email: string;
    phone: string;
    professional_background: string;
    status: ApplicationStatus;
    admin_notes: string | null;
    created_at: string;
    updated_at: string;
    course?: Pick<Course, 'id' | 'title' | 'slug'>;
    user?: Pick<User, 'id' | 'name'> | null;
};

export type Material = {
    id: number;
    course_id: number;
    title: string;
    file_name: string;
    file_size: number | null;
    sort_order: number;
    created_at: string;
};
