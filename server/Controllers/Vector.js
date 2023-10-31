const fs = require('fs');
const csv = require('fast-csv');

// Function to calculate Jaccard similarity between two sets
function calculateJaccardSimilarity(set1, set2) {
  const intersection = new Set([...set1].filter(item => set2.has(item)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

// Read the CSV file and process it
const inputFile = 'bookdetails.csv'; // Replace with your CSV file path
const results = [];

fs.createReadStream(inputFile)
  .pipe(csv.parse({ headers: true }))
  .on('data', (row) => {
    // Extract the relevant columns
    const title1 = new Set(row['Book-Title'].split(',').map(item => item.trim()));
    const title2 = new Set(row['Book-Rating'].split(',').map(item => item.trim()));
    const genre1 = new Set(row['Genre'].split(',').map(item => item.trim()));

    // Calculate Jaccard similarity for Book-Title and Book-Rating
    const titleRatingSimilarity = calculateJaccardSimilarity(title1, title2);

    // Calculate Jaccard similarity for Book-Title and Genre
    const titleGenreSimilarity = calculateJaccardSimilarity(title1, genre1);

    results.push({
      'Book-Title': row['Book-Title'],
      'Book-Rating': row['Book-Rating'],
      'Genre': row['Genre'],
      'Title-Rating-Similarity': titleRatingSimilarity,
      'Title-Genre-Similarity': titleGenreSimilarity,
    });
  })
  .on('end', () => {
    // Data processing is complete, now we can recommend items

    // Function to recommend items based on Jaccard similarity
    function recommendItems(targetItem, numRecommendations) {
      const recommendedItems = [];

      // Find the target item in the results
      const targetItemData = results.find(item => item['Book-Title'] === targetItem);

      if (!targetItemData) {
        console.log(`Item "${targetItem}" not found in the dataset.`);
        return recommendedItems;
      }

      // Iterate through all items in the dataset
      for (const itemData of results) {
        if (itemData['Book-Title'] !== targetItem) {
          // Calculate a weighted similarity score based on Title-Rating and Title-Genre similarities
          const similarityScore =
            0.7 * itemData['Title-Rating-Similarity'] +
            0.3 * itemData['Title-Genre-Similarity'];

          recommendedItems.push({
            'Book-Title': itemData['Book-Title'],
            'SimilarityScore': similarityScore,
          });
        }
      }

      // Sort recommended items by similarity score in descending order
      recommendedItems.sort((a, b) => b['SimilarityScore'] - a['SimilarityScore']);

      // Return the top N recommended items
      return recommendedItems.slice(0, numRecommendations);
    }

    // Usage example: Recommend 3 items similar to 'Item A'
    const recommendedItems = recommendItems('A Thousand Country Roads', 3);
    console.log(`Recommended items for 'A Thousand Country Roads':`);
    console.log(recommendedItems);
  });
