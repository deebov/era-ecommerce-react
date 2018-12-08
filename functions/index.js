const functions = require('firebase-functions');

exports.updateCartCouter = functions.firestore
  .document('cart/{cartid}')
  .onWrite((change, context) => {
    // Stop executing if the data was deleted
    console.log('[CART:after]', context.params.cartid, change.after.exists);
    console.log('[CART:before]', context.params.cartid, change.before.exists);
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
