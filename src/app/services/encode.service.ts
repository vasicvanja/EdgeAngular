import { Injectable } from '@angular/core';
import formurlencoded from 'form-urlencoded';
import { cloneDeep } from 'lodash-es';

@Injectable()
export class EncodeService {

    /*
    * Returns 'x-www-form-urlencoded' string data
    */
    public customFormUrlEncoded(_source: any, skipDeepClone: boolean = false) {
        let source = skipDeepClone ? _source : cloneDeep(_source);
        // formurlencoded with this options { ignorenull: true, sorted: true, skipIndex: true} enocods badly empty array
        Object.keys(source).forEach(key => {
            // iterate through object's properties
            if (source[key] && typeof source[key] === 'object') {
                // if it's an array
                if (source[key].constructor === Array) {
                    // if it's empty
                    if (source[key].length === 0) { // replace Empty Array With Null
                        source[key] = null;
                    }
                }
                if (source[key] && source[key].constructor === Date) {
                    // Date object is convert to string since it is skiped in  formurlencoded method
                    if (source[key] !== '') {
                        source[key] = source[key].toDateString();
                    }
                }
                if (source[key]) {
                    this.customFormUrlEncoded(source[key], true);// Recursively check for properties of type empty arrays
                }
            }

            return; // for simple types
        });

        return formurlencoded(source, { ignorenull: true, sorted: true });// skipIndex: true 
    }
}