const url =
  "https://cdn.contentful.com/spaces/hyjhad0lmcb0/environments/master/entries?access_token=tHJ5ExqGDtNjZRPeFs5Aa2lZ6S6a3qSpiDuW-6_Ouk8&content_type=triviaQ";

$.ajax(url).then((data) => {
  console.log(data);
});
