export interface IUser {
    id: number;
    email: string;
    // password: string;
    isActivated: number;
    // activationLink: string;
}

export interface ILesson {
    id: number;
    title: string;
    imageUrl: string;
    createdAt: number;
    blocks: string;
}

export interface IBlocks {
    blocks?: IBlock[];
}

interface IBlock {
    id: number;
    type: string;
    content: string;
}