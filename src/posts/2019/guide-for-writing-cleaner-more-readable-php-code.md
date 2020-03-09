---
layout: post.njk
title: "Guide for writing cleaner, more readable PHP code"
date: 2019-04-12
author: Jari Lehtinen
tags: ['post', 'PHP']
code: true
---
You have probably seen it: messy PHP code which is hard to read and understand. Chances are that you have written it yourself – or it's written by someone else. Then you have to fix a bug or perhaps just get a hang of what it does.

The more you write code the better you get at it. Still, you could repeat the same routines over and over again without stopping to think why you write code the way you write it.

Here are the few tips I've learned over the years.

## Messy PHP code

Let's look at an example which takes an `$animals` array containing different kinds of animals with name, species, gender, age and weight and sorts them by different criteria.

```php
// Animals
$animals = array(
    array(
        'name' => 'Frank',
        'species' => 'cat',
        'gender' => 'male',
        'age' => 3,
        'weight' => 12
    ),
    array(
        'name' => 'Jones',
        'species' => 'cat',
        'gender' => 'male',
        'age' => 5,
        'weight' => 11
    ),
    array(
        'name' => 'Elvis',
        'species' => 'elephant',
        'gender' => 'male',
        'age' => 2,
        'weight' => 40
    )
);

// Variables for storing the animals
$large_young_animals = array();
$other_animals = array();

// Store large male young cats aged between 0 - 5 years weighting
// more than 10 kgs and also elephants in large animals.
// If not store in other animals.
foreach ($animals as $animal) {
    if (($animal['species'] == 'cat' && $animal['gender'] == 'male' && ​($animal['age'] >= 0 && $animal['age'] <= 5) && $animal['weight'] >= 10) || $animal['species'] == 'elephant') {
        $large_young_animals[] = $animal;
    } else {
        $other_animals[] = $animal;
  }
}

// Oh, we need to remove all animals which are older than 4 years old.
// Note: This is a bit fictional, but you've seen it.
foreach ($large_young_animals as $i => $animal) {
    if ($animal['age'] > 4) {
        unset($large_young_animals[$i]);
    }
}

// Print names of large young male cats and elephants
foreach ($large_young_animals as $animal) {
    echo $animal['name'];
}
```

## Improving readability

While there's nothing wrong with that example – it works as expected – we can certainly improve on that by using *functions* (or *methods* if in context of a class).

Imagine you have this rather messy example of a function:

```php
function sortAnimals($animals) {
	$large_young_animals = array();
	$other_animals = array();

	foreach ($animals as $animal) {
        if (($animal['species'] == 'cat' && $animal['gender'] == 'male' && ($animal['age'] >= 0 && $animal['age'] <= 5) && $animal['weight'] >= 10) || $animal['species'] == 'elephant') {
            $large_young_animals[] = $animal;
        } else {
            $other_animals[] = $animal;
        }
   	}
	
	// Oh, we need to remove all animals which are older than 8 years old.
	// This is a bit fictional, but you've seen it (hotfix, anyone?).
	foreach ($large_young_animals as $i => $animal) {
	    if ($animal['age'] > 4) {
	        unset($large_young_animals[$i]);
	    }
    }

    return array($large_young_animals, $other_animals);
}

// Storage
$large_young_animals = array();
$other_animals = array();

list ($large_young_animals, $other_animals) = sortAnimals($animals);

// Print names of large young animals and elephants
foreach ($large_young_animals as $animal) {
    echo $animal['name'];
}
```

Here we have a `sortAnimals()` function, but it actually doesn't make the code more readable: it's just the same code wrapped in a function. It made the last part of the code a bit easier to approach, but otherwise it's pretty much the same.

## A function that did too much

While our `sortAnimals()` function is relatively simple, it's doing too many different things. There's two sets of `foreach` loops, several variables and `if` clauses. Also the `$other_animals` isn't used anywhere.

First thing here is to make sure that a function does as little as possible. Adding one function might not be enough: you might need to break the function into several functions.

So when writing a function:

**Rule #1:** Make function as simple as you can

**Rule #2:** Break large functions into several functions

## If, else... What else? What if no else?

The `sortAnimals()` function has too many `if` clauses – and it even has a `else` there. Else? What else?

Look at this:

```php
if (($animal['species'] == 'cat' && $animal['gender'] == 'male' && ​($animal['age'] >= 0 && $animal['age'] <= 5) && $animal['weight'] >= 10) || $animal['species'] == 'elephant') {
    $large_young_animals[] = $animal;
} else {
    $other_animals[] = $animal;
}
```

To understand what the `else` does, you need to go up few lines (or a lot of lines depending on your code) and try to understand the monstrous set of `if` clauses, and then figure out when the `else` triggers.

See this example:

```php
function isMagic($trick) {
    if ($trick == 'amazing') {
        return true;
    } else {
        return false;
    }
}
```

There's really no real reason to have that else there. If the `$trick` is not "amazing", it would return `false` even without the `else`. So it's better to just have:

```php
function isMagic($trick) {
    if ($trick == 'amazing') {
        return true;
    }
  
    return false;
}
```

Or you even could drop the `return false`:

```php
function isMagic($trick) {
    if ($trick == 'amazing') {
        return true;
    }
}
```

Or use a shorthand:

```php
function isMagic($trick) {
    return $trick == 'amazing' ? true : false;
}
```

**Rule #3:** Else is never needed

It's a matter of structuring your code differently.

## What did you expect the function to return?

`sortAnimals()` function returns two arrays: `$large_young_animals` and `$other_animals`.

Just by looking at the function name, what did you expect it to return? We passed an array of `$animals` and got two arrays back. You probably assumed that you get back the sorted `$animals` array?

It's better to come up with a function name that is too descriptive – than not descriptive at all – or tells just a part of the story.

So `sortAnimalsToLargeYoungMaleAndOtherAnimals()` would be better, but is a bit on the long side. If your function name gets too long, you might need to re-structure your code.

**Rule #4:** Be clear when naming functions

## Rewriting the function

Let's rewrite the function. Start by renaming it to `getLargeYoungMaleAnimals()` and dropping few tasks out of it:

```php
function getLargeYoungMaleAnimals($animals) {
    $large_young_animals = array();

    foreach ($animals as $animal) {
        if (($animal['species'] == 'cat' && $animal['gender'] == 'male' && ​($animal['age'] >= 0 && $animal['age'] <= 5) && $animal['weight'] >= 10) || $animal['species'] == 'elephant') {
            $large_young_animals[] = $animal;
        }
    }
	
    return $large_young_animals;
}
```

It's now a bit better, but it doesn't do all the things we need it to do. We'll get back to that later.

Let's write a helper function called `isLargeYoungMaleAnimal()`:

```php
function isLargeYoungMaleAnimal($animal) {
    if (($animal['species'] == 'cat' && $animal['gender'] == 'male' && ​($animal['age'] >= 0 && $animal['age'] <= 5) && $animal['weight'] >= 10) || $animal['species'] == 'elephant') {
        return true;
    }
}

function getLargeYoungMaleAnimals($animals) {
    $large_young_animals = array();

    foreach ($animals as $animal) {
        if (isLargeYoungMaleAnimal($animal)) {
            $large_young_animals[] = $animal;
        }
    }
	
    return $large_young_animals;
}
```

There's still that awful `if` clause which unnecessarily increases complexity. It gets better as we rewrite it again and change the logic a bit.

## Write more functions

Let's break the `if` clause into several self-explanatory functions:

```php
function isCat($animal) {
    if ($animal['species'] == 'cat') {
        return true;
    }
}
```

While this is technically correct, we get to the next rule:

**Rule #5:** Shorter code is better code – but not always

Why I say *not always*? Because **clearer code is always better than shorter code**. You might write code that works, but isn't as easy to read.

Actually, let's rewrite the Rule #5:

**Rule #5:** Shorter code is better, if it's more readable

As the function above is as readable as it can get, sometimes we might want to drop few lines of code:

```php
function isCat($animal) {
    return $animal['species'] == 'cat' ? true : false;
}
```

Here we used a shorthand for if-else, but then you need to know what those `?` and `:` does. So which one is more readable? Personally I'd use the shorthand one having less lines, but in the end it's up to you.

## If it gets confusing, change the logic

Okay, let's get back to the animals by writing more functions:

```php
function isCat($animal) {
    return $animal['species'] == 'cat' ? true : false;
}

function isYoung($animal) {
    return $animal['age'] >= 0 && $animal['age'] <= 5 ? true : false;
}
```

Wait. That `return` in `isYoung()` has two `if` clauses. In real world, a similar function could have even more `if` clauses. So how can we improve? By changing the logic:

```php
function isYoung($animal) {
    return $animal['age'] > 5 ? false : true;
}
```

Sometimes when writing `if` clauses you can do just the opposite you were first doing. In the first version we checked if animal's age was between 0 and 5, but we could check only if age is over 5 and get the same result.

## Always be positive

Of course we could do the opposite on the whole function by renaming the `isYoung()` function to `isOld()`:

```php
function isOld($animal) {
    return $animal['age'] > 5 ? true : false;
}
```

While this is fine, `isYoung()` describes better what we wanted to achieve. Remember, we want to get *"large male young cats aged between 0 - 5 years weighting more than 10 kgs"*.

Also we would need to use a negative statement later on the code:

```php
if (!isOld($animal)) {
    // Do something
}
```

Which isn't preferable, because:

**Rule #6:** Always be positive

To put that into perspective: always avoid negatives, because it could lead into double negatives.

See this example:

```php
function isDisabled($value) {
    if ($value == 'disabled') {
        return true;
    }

    return false;
}

// Is it enabled or disabled?
$value = 'enabled';

if (!isDisabled($value)) {
    echo 'Enabled!';
}
```

See the `!isDisabled($value)`? It certainly works, but the more readable alternative would be:

```php
function isEnabled($value) {
    if ($value == 'enabled') {
        return true;
    }

    return false;
}

// Is it enabled or disabled?
$value = 'enabled';

if (isEnabled($value)) {
    echo 'Enabled!';
}
```

## Function counterparts for if clauses

Let's write function counterparts for every `if` clause:

```php
function isCat($animal) {
    return $animal['species'] == 'cat' ? true : false;
}

function isElephant($animal) {
    return $animal['species'] == 'elephant' ? true : false;
}

function isMale($animal) {
    return $animal['gender'] == 'male' ? true : false;
}

function isYoung($animal) {
    return $animal['age'] > 5 ? false : true;
}

function isLarge($animal) {
    return $animal['weight'] >= 10 ? true : false;
}

function isLargeYoungMaleAnimal($animal) {
    if ((isCat($animal) && isMale($animal) && isYoung($animal) && isLarge($animal)) || isElephant()) {
        return true;
    }
}
```

We added several descriptive functions, but that set of `if` clauses in `isLargeYoungMaleAnimal()` is still hard to understand – especially with that `isElephant()` there.

## Return early and often

Let's prove Rule #5 (Shorter code is better, if it's more readable) and rewrite that function:

```php
function isLargeYoungMaleAnimal($animal) {
    if (isElephant()) {
        return true;
    }

    if (!isCat($animal)) {
        return false;
    }

    if (!isMale($animal)) {
        return false;
    }
    
    if (!isYoung($animal)) {
        return false;
    }
    
    if (!isLarge($animal)) {
        return false;
    }
    
    return true;
}
```

We made the function more readable by returning `true` or `false` when a criteria is met. If the animal is an elephant, there's no need to check if it's a cat, a male etc.

Which leads us up to a new rule:

**Rule #7:** Return early and often

## Elephant in the room?

We still have one issue: how being an elephant relates to our function `isLargeYoungMaleAnimal()`? You should expect the function to return "large", "young" and "male" animals, but this one checks if the animal is an elephant. It might be a old little elephant and still pass.

We could rename the function again to `isElephantOrALargeYoungMaleAnimal()` or even better: change the logic. 

So let's change the logic to make the function more understandable. Leave the elephant out for now and worry about it later. When changing the logic we see that it only checks for cats, so we can also rename the function:

```php
function isLargeYoungMaleCat($animal) {
    if (!isCat($animal)) {
        return false;
    }

    if (!isLarge($animal)) {
    	  return false;
    }
    
    if (!isMale($animal)) {
        return false;
    }
    
    if (!isYoung($animal)) {
        return false;
    }
    
    return true;
}
```

Now our function checks if all criteria is met and returns `true` if they are.

## Wrapping up

Let's combine all we learned:

```php
function isCat($animal) {
    return $animal['species'] == 'cat' ? true : false;
}

function isElephant($animal) {
    return $animal['species'] == 'elephant' ? true : false;
}

function isMale($animal) {
    return $animal['gender'] == 'male' ? true : false;
}

function isYoung($animal) {
	  return $animal['age'] > 5 ? false : true;
}

function isLarge($animal) {
    return $animal['weight'] >= 10 ? true : false;
}

function isLargeYoungMaleCat($animal) {
    if (!isCat($animal)) {
        return false;
    }

    if (!isMale($animal)) {
        return false;
    }
    
    if (!isYoung($animal)) {
        return false;
    }
    
    if (!isLarge($animal)) {
        return false;
    }
    
    return true;
}

function getLargeYoungMaleCats($animals) {
    foreach ($animals as $i => $animal) {
        if (!isLargeYoungMaleCat($animal)) {
            unset($animals[$i]);
        }
    }
	
    return $animals;
}

function getElephants($animals) {
    foreach ($animals as $i => $animal) {
        if (!isElephant($animal)) {
            unset($animals[$i]);
        }
    }
	
    return $animals;
}

function removeAnimalsOlderThanFour($animals) {
    foreach ($animals as $i => $animal) {
        if ($animal['age'] > 4) {
            unset($animals[$i]);
        }
    }
  
    return $animals;
}

// Get large young male cats
$large_young_male_cats = getLargeYoungMaleCats($animals);

// Get elephants
$elephants = getElephants($animals);

// Gather large young animals and elephants into one array
$remaining_animals = array_merge($large_young_male_cats, $elephants);

// Remove animals older than 4 years old
// Note: yes, we could do this on the getLargeYoungMaleCats()
// but let's pretend there is a good reason to have this here
$remaining_animals = removeAnimalsOlderThanFour($remaining_animals);

// Print names of large young male cats and elephants
foreach ($remaining_animals as $animal) {
    echo $animal['name'];
}
```

Now you probably noticed that we actually got over 80 lines instead of 27 lines in the first example. You're totally right. So it's not better? We made it worse? But remember rule #5? *Shorter code is better, if it's more readable.*

It really boils down to actual things you are coding – not just these cats and elephants. When your codebase contains a lot of code, readability is the key.

Happy coding!

## TLDR

**Rule #1:** Make functions as simple as you can

Make sure your function does only one thing, and is really clear about what it does.

**Rule #2:** Break functions into several functions

If your function does more than one thing, it is wise to break it down to several functions.

**Rule #3:** Else is never needed

Just wrote if...else? Else is not needed. It's a matter of structuring your code differently.

**Rule #4:** Be clear when naming functions

Use descriptive function names. Better to be over-descriptive than to leave things out.

**Rule #5:** Shorter code is better, if it's more readable

Avoid tricks, aim for readable code.

**Rule #6:** Always be positive

In coding, in life. Having a function like `isDisabled()` is bad, because it leads to double negatives.

**Rule #7:** Return early and often

When writing a function, always stop and think if you can return here.