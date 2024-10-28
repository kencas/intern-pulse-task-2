import { BookDto, BookOperationDto } from "./book.dto";


export interface IBookManagementService {
    
    createBook(crrateBook: BookDto): Promise<BookDto>;
    getBookListing(): Promise<BookDto[]>;
    getBookByCode(code: string): Promise<BookDto>;
    getBookById(id: number | string): Promise<BookDto>;
    updateBook(id: number, data: BookDto): Promise<BookDto>;
    deleteBook(id: number | string): Promise<void>;
    performBookOperation(id: number, data: BookOperationDto);
}