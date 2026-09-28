import mongoose,{Schema} from "mongoose";
import { MemberType } from "../libs/enums/member.enum";
import { MemberStatus } from "../libs/enums/member.enum";


import { Member } from "../libs/types/member";

const memberSchema = new Schema<Member>({
    memberType:{ 
        type: String,
        enum: MemberType,
        default: MemberType.USER,
    },

    memberStatus:{
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE,
       
    },

     memberNick:{
        type: String,
        index: {unique: true, sparse: true},
        required: true,
    },

     memberPhone:{
        type: String,
        index: {unique: true, sparse: true},
        required: true,
    },

    memberPassword:{
        type: String,
        select: false,
        required: true,
    },

    memberAddress:{
        type: String,
    },

     memberDesc:{
        type: String,
    },

     memberImage:{
        type: String,
    },

     memberPoints:{
        type: Number,
        default: 0,
    },
},

{timestamps: true} // UpdatedAt and CreatedAt fields will be automatically added to the schema

);

export default mongoose.model("Member", memberSchema);