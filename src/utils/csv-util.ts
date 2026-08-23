
import * as fs from "fs";
import {parse} from 'csv-parse/sync';

export class CsvHelper{

    static readCsv(filepath: string): Record<string, string>[]{

        return parse(fs.readFileSync(filepath, "utf-8"), {
            columns: true, //to treat first row as header
            skip_empty_lines: true,
            trim: true
        }) as Record<string, string>[];
    }
}