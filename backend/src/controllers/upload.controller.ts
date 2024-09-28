import { NextFunction, Request, Response } from 'express';
import { sendSuccessResponse, } from '../utils/responseHandler';
import * as AuthorService from '../services/author.service';
import Papa from 'papaparse';
import fs from 'fs'

export const uploadFile = async (request: Request, response: Response, next: NextFunction) => {
    try {
        if (!request.file) {
            return response.status(400).send('No file uploaded.');
        }

        const filePath = request.file.path;
        Papa.parse(fs.createReadStream(filePath), {
            header: true, // If the CSV file has a header row
            complete: (results) => {
                fs.unlinkSync(filePath); // Delete the temporary file

                // Process the parsed data
                results.data.map(async (data) => {
                    await AuthorService.createAuthor(data as any)
                })
                return sendSuccessResponse(response, results.data);

            },
            error: (error) => {
                console.error(error);
                fs.unlinkSync(filePath); // Delete the temporary file
                response.status(500).send('Error parsing CSV file.');
            }
        });
    } catch (error) {
        next(error);
    }
};

