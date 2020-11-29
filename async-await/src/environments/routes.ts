import { environment } from '../environments/environment';

export const USER_ROUTES = {
    CREATE_USER(): string {
        return `${environment.apiURL}/users`;
    },
    LOGIN(): string {
        return `${environment.apiURL}/users`;
    },
    CHECK_TOKEN(): string {
        return `${environment.apiURL}/users/tokens`;
    },
    DELETE_USER(userId: number): string {
        return `${environment.apiURL}/users/${userId}`;
    }
};

export const PROJECT_ROUTES = {
    GET_USERS_PROJECTS(userId: number): string {
        return `${environment.apiURL}/users/${userId}/projects`;
    },
    GET_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${userId}/projects/${projectId}`;
    },
    CREATE_PROJECT(userId: number): string {
        return `${environment.apiURL}/users/${userId}/projects`;
    },
    ADD_USER_TO_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${userId}/projects/${projectId}/users`;
    },
    GET_PROJECT_USERS(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${userId}/projects/${projectId}/users`;
    },
    ADD_ADMIN_USER_TO_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${userId}/projects/${projectId}/admin/users`;
    },
    GET_PROJECT_ADMINS(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${userId}/projects/${projectId}/admin/users`;
    },
    UPDATE_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${userId}/projects/${projectId}`;
    },
    DELETE_USER_FROM_PROJECT(userId: number, projectId: number, deleteId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/users/${
            deleteId
        }`;
    },
    DELETE_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${userId}/projects/${projectId}`;
    },
    GET_IDEAS_FOR_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${userId}/projects/${projectId}/ideas`;
    }
};

export const IDEA_ROUTES = {
    CREATE_IDEA(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${userId}/projects/${projectId}/ideas`;
    },
    UPDATE_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }`;
    },
    GET_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }`;
    },
    DELETE_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }`;
    },
    UPDATE_STATE(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }/status`;
    },
    GET_COMMENTS_FOR_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
           ideaId
        }/comments`;
    }
};

export const COMMENT_ROUTES = {
    CREATE_COMMENT(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }/comments`;
    },
    DELETE_COMMENT(userId: number, projectId: number, ideaId: number, commentId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }/comments/${
            commentId
        }`;
    },
    UPDATE_COMMENT(userId: number, projectId: number, ideaId: number, commentId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }/comments/${
            commentId
        }`;
    },
    GET_COMMENT(userId: number, projectId: number, ideaId: number, commentId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }/comments/${
            commentId
        }`;
    },
};

export const VOTE_ROUTES = {
    VOTE_ON_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }/votes`;
    },
    GET_VOTE_FOR_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }/votes`;
    },
    UPDATE_VOTE_ON_IDEA(userId: number, projectId: number, ideaId: number, voteId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }/votes/${
            voteId
        }`;
    },
    DELETE_VOTE_ON_IDEA(userId: number, projectId: number, ideaId: number, voteId: number): string {
        return `${environment.apiURL}/users/${
            userId
        }/projects/${
            projectId
        }/ideas/${
            ideaId
        }/votes/${
            voteId
        }`;
    },
};

