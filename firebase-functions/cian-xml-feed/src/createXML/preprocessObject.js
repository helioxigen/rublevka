const getOppositeOfferKind = (offerKind) => {
  switch (offerKind) {
    case 'sale':
      return 'rent';
    case 'rent':
      return 'sale';
    default:
      return 'rent';
  }
}

const preprocessObject = (item, resultObject) => {
  //we need to validate that we have an object for presented offerKind
  if (!item[`${item.offerKind}Offer`]){
    //we don't have an object for this offerKind
    //maybe we have it for opposite offerKind?
    if (item[`${getOppositeOfferKind(item.offerKind)}Offer`]){
      //yes, we have an object for opposite offerKind, so we will export this house to the feed with changed offerKind
      item.offerKind = getOppositeOfferKind(item.offerKind);
      //also add warning, so staff also should fix this by themselves
      resultObject.warning = 'У данного дома установлено неправильное значение поля "offerKind". Пожалуйста, исправьте его.'
    } else {
      //it looks like we don't have any deal objects
      //let's skip this house
      throw new Error('У данного дома нет объектов, описывающих его стоимость.')
    }
  }
}

exports.preprocessObject = preprocessObject;