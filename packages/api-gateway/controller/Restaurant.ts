import React, { useEffect, useState } from 'react';
import { Request, Response } from 'express';
import axios , { AxiosResponse } from 'axios';

export interface InfoStore {
    "name": String;
    "id": Number;
    "coverImage": string;
    "activeTimePeriod": {
        open: string
        close: string
    }
    "menus" : string[];
    
    
}

const getRestaurant = async (req: Request, res: Response) => {
    let result: AxiosResponse = await axios.get(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/` +req.params.id +`.json`);
    let data: [InfoStore] = result.data;
    return res.status(200).json({
        message: data
    });
};

export interface InfoShortMenu {
    "name": string;
    "id": string;
    "thumbnailImage"?: string;
    "fullPrice": number;
    "discountedPercent": number;
    "discountedTimePeriod"?: {
        "begin": string;
        "end": string;
    }
    "sold": number;
    "totalInStock": number;
}

const getShortMenu = async (req: Request , res : Response ) => {

    let result : AxiosResponse = await axios.get(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/` + req.params.id +  `/menus/` + req.params.menuName + `/short.json`);
    let data: [InfoShortMenu] = result.data;
    return res.status(200).json({
        message: data
    });
};

export interface InfoFullMenu {
    "name": string;
    "id": string;
    "thumbnailImage"?: string;
    "fullPrice": number;
    "discountedPercent": number;
    "discountedTimePeriod"?: {
        "begin": string;
        "end": string;
    }
    "sold": number;
    "totalInStock": number;
    "largeImage"?: string;
    "options": {
        "label": string;
        "choices": {
        "label": string;
        }[]
    }[]
}

const getFullMenu = async (req: Request , res : Response ) => {
    let result : AxiosResponse = await axios.get(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/` + req.params.id +  `/menus/` + req.params.menuName + `/full.json`);
    let data: [InfoFullMenu] = result.data;
    return res.status(200).json({
        message: data
    });
};

export default {getRestaurant , getShortMenu , getFullMenu};

