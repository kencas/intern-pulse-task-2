import {Entity, Column, Generated} from "typeorm";
import { BaseModel } from "../../base/model";
import { AvailabilityStatusEnum } from "./book.dto";


@Entity()
export class Book extends BaseModel {
    
    @Generated("uuid")  
    @Column()
    public bookId?: string;

    @Column({ nullable: false, unique: true})
    public isbn?: string;

    @Column({ nullable: false})
    public title?: string;

    @Column({ nullable: false})
    public author?: string;

    @Column({ nullable: false})
    public genre?: string;

    @Column({ nullable: true})
    public edition?: string;

    @Column({ nullable: true})
    public summary?: string;
 
    @Column({ 
        type: 'timestamp', 
        transformer: {
            to: (value: Date) => value,
            from: (value: string) => new Date(value)
        },
    })
    public publicationDate?: Date;

    @Column({
        type: "enum",
        enum: AvailabilityStatusEnum,
        default: AvailabilityStatusEnum.AVAILABLE
    })
    public availabilityStatus?: AvailabilityStatusEnum;

}
