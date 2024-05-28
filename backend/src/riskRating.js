function claimToLowerCase(claimArray) {
    return claimArray.map((word) => word.toLowerCase());
  }
  
  function isKeywordMatch(claimArrayItem) {
    const keywords = ["collide", "crash", "scratch", "bump", "smash"];
    if (claimArrayItem === 'bumper') {
      return;
    } else {
      for (const keyword of keywords) {
        if (claimArrayItem.includes(keyword)) {
          return true;
        }
      }
    }
  }
  
  function countKeywords(claimArray) {
    let count = 0;
    for (const arrayItem of claimArray) {
      console.log(arrayItem);
      if (isKeywordMatch(arrayItem)) {
        count++;
      }
    }
    return count;
  }
  
  function isOnlyWhitespace(str) {
    return str.trim().length === 0;
  } 
  
  function calculateRiskRating(inputClaim){
    const claimArray = claimToLowerCase(inputClaim.split(" "));
    
      return countKeywords(claimArray);
  };
  
  module.exports = { calculateRiskRating };
  