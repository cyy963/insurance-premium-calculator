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
  const MINIMUM_RISK_RATING = 1;
  const MAXIMUM_RISK_RATING = 5;
    let count = 0;
    for (const arrayItem of claimArray) {
      if (isKeywordMatch(arrayItem)) {
        count < MAXIMUM_RISK_RATING ? count++: count += 0;
      }
    }
    return (count === 0? MINIMUM_RISK_RATING : count );
  }
   
  
function calculateRiskRating(inputClaim) {
  const MINIMUM_WORDS_IN_CLAIM = 3;
  const regex = /^[^a-zA-Z0-9]+$/;
    const claimArray = claimToLowerCase(inputClaim.trim().split(" "));
    if (claimArray < MINIMUM_WORDS_IN_CLAIM || regex.test(inputClaim)) {
      return 'error';
    } else {
      return countKeywords(claimArray);
    }
      
  };
  
  module.exports =  calculateRiskRating ;
  