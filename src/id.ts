type Id = string;

export abstract class IdGenerator {
    public static next(): Id {
        // TODO
        return "000-000-000-000";
    }
}

export default Id;
