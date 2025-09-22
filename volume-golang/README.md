# EXPLANATION

## FLOW
1. Perumpamaan User akses http://localhost:8080/rouf
2. Handler HelloServer bikin string "Hello Rouf"
3. Konversi jadi bytes lalu tulis ke file /logs/rouf.txt
4. Print ke stdout 
"DONE Write File : /logs/rouf.txt"