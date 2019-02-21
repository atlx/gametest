import shortid from "shortid";

type Id = string;

export abstract class IdGenerator {
    public static next(): Id {
        return shortid.generate();
    }
}

export default Id;
