module.exports = {
    // Counts the number of times each name appears on the list
    tally: function(ourList, ourNames){
        // console.log(ourList);
        // console.log(ourNames);
        var totals = [];
        ourNames.forEach(function(){
            totals.push(0)
        });

        ourList.forEach(function(thisItem){
            for(var thisName = 0; thisName < ourNames.length; thisName++){
                if(thisItem == ourNames[thisName]){
                    totals[thisName] += 1;
                }
            }
        });

        return totals;
    },

    // Adds two arrays element-wise
    addArrays: function(array1, array2){
        for(var index = 0; index < array1.length; index++){
            array1[index] = array1[index] + array2[index];
        }

        return array1;
    }
};

