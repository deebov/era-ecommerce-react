const functions = require('firebase-functions');

exports.updateCartCouter = functions.firestore
  .document('cart/{uid}/items/{itemId}')
  .onWrite(change => {
    // Stop executing if the data was deleted
    if (!change.after.exists) return null;

    const data = change.after.data();
    const previousData = change.before.data();

    // Stop executing if the data was not updated by client
    if (data.updated) return null;

    const count = data.amount;
    const updatedCount = previousData ? previousData.amount + count : count;
    const totalPrice = updatedCount * data.product.price;

    return change.after.ref.set(
      {
        amount: updatedCount,
        total_price: +totalPrice.toFixed(2),
        updated: true
      },
      { merge: true }
    );
  });
