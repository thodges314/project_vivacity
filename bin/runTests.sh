#!/bin/bash

find ./__tests__ -type f -name '*.test.ts' -print0 | while IFS= read -r -d '' file; do
	/bin/bash ./bin/configuredb.sh && npm test "$file";
done

/bin/bash ./bin/configuredb.sh;