#! /bin/bash

echo -n "Please input the range of numbers: "
read min max 

diff=$(($max-$min))

while [ true ]; do
    que=$(($RANDOM%$diff+$min))
    say $que
    echo -n 'Input the number you just heard: '
    read ans

    until [[ $que = $ans ]]; do
        echo "❌"
        echo -n "Try again: "
        say $que
        read ans
    done
    echo "✅"
done

