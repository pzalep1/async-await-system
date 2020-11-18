import { environment } from '../environments/environment';
import * as querystring from 'query-string';

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
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}`;
    }
};

export const PROJECT_ROUTES = {
    GET_USERS_PROJECTS(userId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects`;
    },
    GET_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(projectId)}`;
    },
    CREATE_PROJECT(userId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects`;
    },
    ADD_USER_TO_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(projectId)}/users`;
    },
    //NEEDS TO BE WRITTEN INTO BACKEND
    GET_PROJECT_USERS(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(projectId)}/users`;
    },
    ADD_ADMIN_USER_TO_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(projectId)}/admin/users`;
    },
    //NEEDS TO BE WRITTEN INTO BACKEND
    GET_PROJECT_ADMINS(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(projectId)}/admin/users`;
    },
    UPDATE_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(projectId)}`;
    },
    DELETE_USER_FROM_PROJECT(userId: number, projectId: number, deleteId: string): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/users/${
            encodeURIComponent(deleteId)
        }`;
    },
    DELETE_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(projectId)}`;
    },
    GET_IDEAS_FOR_PROJECT(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(projectId)}/ideas`;
    }
};

export const IDEA_ROUTES = {
    CREATE_IDEA(userId: number, projectId: number): string {
        return `${environment.apiURL}/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(projectId)}/ideas`;
    },
    UPDATE_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }`;
    },
    GET_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }`;
    },
    DELETE_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }`;
    },
    UPDATE_STATE(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/status`;
    },
    GET_COMMENTS_FOR_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/comments`;
    }
};

export const COMMENT_ROUTES = {
    CREATE_COMMENT(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/comments`;
    },
    DELETE_COMMENT(userId: number, projectId: number, ideaId: number, commentId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/comments/${
            encodeURIComponent(commentId)
        }`;
    },
    UPDATE_COMMENT(userId: number, projectId: number, ideaId: number, commentId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/comments/${
            encodeURIComponent(commentId)
        }`;
    },
    GET_COMMENT(userId: number, projectId: number, ideaId: number, commentId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/comments/${
            encodeURIComponent(commentId)
        }`;
    },
};

export const VOTE_ROUTES = {
    VOTE_ON_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/votes`;
    },
    GET_VOTE_FOR_IDEA(userId: number, projectId: number, ideaId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/votes`;
    },
    UPDATE_VOTE_ON_IDEA(userId: number, projectId: number, ideaId: number, voteId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/votes/${
            encodeURIComponent(voteId)
        }`;
    },
    DELETE_VOTE_ON_IDEA(userId: number, projectId: number, ideaId: number, voteId: number): string {
        return `${environment.apiURL}/users/${
            encodeURIComponent(userId)
        }/projects/${
            encodeURIComponent(projectId)
        }/ideas/${
            encodeURIComponent(ideaId)
        }/votes/${
            encodeURIComponent(voteId)
        }`;
    },
};

