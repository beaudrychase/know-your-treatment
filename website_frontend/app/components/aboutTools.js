module.exports = {
    // Collects and counts information from an API
    collect: function(ourURL, ourItem, ourComparators, currentTotals){
        console.log(ourURL);
        console.log(ourItem);
        console.log(ourComparators);
        console.log(currentTotals);
        for(var pageNum = 1; pageNum < 10; pageNum++) {
            var newTotals = [   ];
            newTotals = fetch(ourURL + "&page=" + pageNum)
            .then(results => results.json())
            .then(receivedDataset => receivedDataset.map(thisSubset => thisSubset.ourItem))
            .then(receivedItems => this.tally(receivedItems, ourComparators))
            .then(thisPageTotals => this.addArrays(thisPageTotals, currentTotals));
            // .then(allPagesTotals => return newTotals}));
            return newTotals;
        }
    },

    // Counts the number of times each name appears on the list
    tally: function (ourList, ourNames){
        // console.log(ourList);
        // console.log(ourNames);
        var totals = [];
        ourNames.forEach(function() {
            totals.push(0)
        });

        ourList.forEach(function(thisItem){
            for (var thisName = 0; thisName < ourNames.length; thisName++){
                if (thisItem == ourNames[thisName]){
                    totals[thisName] += 1;
                }
            }
        });

        return totals;
    },

    // Adds two arrays element-wise
    addArrays: function (array1, array2){
        for(var index = 0; index < array1.length; index++){
            array1[index] = array1[index] + array2[index];
        }

        return array1;
    }
};