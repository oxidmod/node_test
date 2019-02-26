# node_test
Test EAV

How to run
1. Clone repository
2. Go to repository root
3. docker build -t oxidmod/node_test .
4. docker run  -v $(pwd)/test.js:/app/test.js -it oxidmod/node_test sh -c "node test.js"
