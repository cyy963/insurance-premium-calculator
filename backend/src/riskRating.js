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
   
  
function calculateRiskRating(inputClaim) {
  const MINIMUM_WORDS_IN_CLAIM = 3;
    const claimArray = claimToLowerCase(inputClaim.trim().split(" "));
    if (claimArray < MINIMUM_WORDS_IN_CLAIM) {
      return 'error';
    } else {
      return countKeywords(claimArray);
    }
      
  };
  
  module.exports = { calculateRiskRating };
  