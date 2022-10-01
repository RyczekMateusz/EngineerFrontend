const OffersListing = () => {
  const offers = [
    {
      id: 1,
      photo: 'link1',
      offerName: 'name',
      address: 'Katowice, ul. Mariacka 7/12, 34-326',
      price: 1234,
    },
  ]

  return (
    <div>
      {offers.map(offer => (
        <div key={offer.id}>{offer.id}</div>
      ))}
    </div>
  )
}

export default OffersListing
