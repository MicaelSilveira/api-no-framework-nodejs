echo '*CREATING PRODUCT*'
curl --silent -X POST --data-binary '{"name": "tablet","category": "eletronic","price": 600}' localhost:5000/product

echo ''
echo '*ALL PRODUCTS*'
curl localhost:5000/products