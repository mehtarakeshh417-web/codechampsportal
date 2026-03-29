// Curriculum content for Classes 9-10
import type { TopicTextbook } from "./class5Content";

// ======================== CLASS 9: ADVANCED PYTHON ========================
const c9PythonAdv: TopicTextbook = {
  topicId: "c9-py-adv",
  topicTitle: "Advanced Python Programming",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Data Structures in Python",
      subtitle: "Lists, tuples, dictionaries and sets",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Python Data Structures",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
          body: "Python provides powerful built-in data structures that let you organize and manage data efficiently. Understanding when to use each data structure is a critical skill for any programmer.\n\n**Lists** are the most versatile — they store ordered collections that can be modified. **Tuples** are similar but immutable, making them perfect for data that shouldn't change. **Dictionaries** map unique keys to values, enabling lightning-fast lookups. **Sets** store only unique values and support powerful mathematical operations like union and intersection.\n\nChoosing the right data structure can make the difference between a program that runs in seconds vs minutes. As your datasets grow larger, efficiency matters more and more.",
          youtubeId: "kqtD5dpn9C8",
          tip: "Use lists for ordered collections, dictionaries for key-value data, sets for unique items, and tuples for fixed data.",
          table: {
            headers: ["Data Structure", "Syntax", "Ordered?", "Mutable?", "Duplicates?"],
            rows: [
              ["**List**", "`[1, 2, 3]`", "Yes", "Yes", "Yes"],
              ["**Tuple**", "`(1, 2, 3)`", "Yes", "No", "Yes"],
              ["**Dictionary**", "`{'a': 1}`", "Yes (3.7+)", "Yes", "Keys: No"],
              ["**Set**", "`{1, 2, 3}`", "No", "Yes", "No"]
            ]
          },
          illustration: [
            { emoji: "📋", label: "List" },
            { emoji: "🔒", label: "Tuple" },
            { emoji: "📖", label: "Dictionary" },
            { emoji: "🎯", label: "Set" }
          ]
        },
        {
          heading: "Working with Lists",
          body: "Lists are Python's workhorse data structure. They can hold any type of data — numbers, strings, even other lists. Lists are **ordered** (items stay in the order you add them) and **mutable** (you can change them after creation).\n\n**Common operations include** adding items with `append()` and `insert()`, removing items with `remove()` and `pop()`, sorting with `sort()`, and finding items with `index()`. You can also slice lists to get sub-sections, and use list comprehensions for concise creation.\n\nLists are used everywhere in real programs — storing user data, processing files line by line, managing game inventories, and much more.",
          codeBlock: {
            language: "python",
            code: "# Creating and modifying lists\nfruits = ['apple', 'banana', 'cherry']\nfruits.append('mango')        # Add to end\nfruits.insert(1, 'grape')      # Insert at position\nfruits.remove('banana')        # Remove by value\nprint(fruits)                  # ['apple', 'grape', 'cherry', 'mango']\n\n# Slicing\nprint(fruits[1:3])             # ['grape', 'cherry']\nprint(fruits[::-1])            # Reversed list\n\n# List comprehension\nsquares = [x**2 for x in range(1, 6)]  # [1, 4, 9, 16, 25]\nevens = [x for x in range(20) if x % 2 == 0]  # Even numbers 0-18\n\n# Nested lists (2D)\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint(matrix[1][2])            # 6"
          },
          keyTerms: [
            { term: "Mutable", definition: "Can be changed after creation (lists, dicts, sets)" },
            { term: "Immutable", definition: "Cannot be changed after creation (tuples, strings)" },
            { term: "List Comprehension", definition: "A concise way to create lists: [expression for item in iterable]" },
            { term: "Slicing", definition: "Extracting a portion of a list using [start:stop:step]" }
          ]
        },
        {
          heading: "Dictionaries and Sets",
          body: "**Dictionaries** are one of Python's most powerful features. They store data as key-value pairs, allowing O(1) average-time lookups — meaning finding a value is almost instant regardless of how much data you have.\n\n**Sets** store only unique values and support mathematical set operations. They're perfect for removing duplicates, checking membership, and performing operations like union, intersection, and difference.\n\nBoth dictionaries and sets use hash tables internally, which is why they're so fast for lookups compared to lists.",
          codeBlock: {
            language: "python",
            code: "# Dictionary operations\nstudent = {'name': 'Aarav', 'age': 15, 'grade': 'A'}\nprint(student['name'])         # Access by key\nstudent['city'] = 'Delhi'      # Add new key\nstudent.get('phone', 'N/A')    # Safe access with default\n\n# Looping through dictionaries\nfor key, value in student.items():\n    print(f'{key}: {value}')\n\n# Set operations\na = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\nprint(a | b)    # Union: {1,2,3,4,5,6,7,8}\nprint(a & b)    # Intersection: {4, 5}\nprint(a - b)    # Difference: {1, 2, 3}"
          },
          comparison: {
            left: { title: "Lists vs Tuples", points: ["Lists are mutable — use when data changes", "Tuples are immutable — use for fixed data", "Tuples are slightly faster than lists", "Tuples can be used as dictionary keys"] },
            right: { title: "Dicts vs Sets", points: ["Dicts store key-value pairs — use for lookups", "Sets store unique values only — use to remove duplicates", "Both have O(1) average lookup time", "Sets support mathematical operations (union, intersection)"] }
          },
          warningNote: "Never use a mutable type (like a list) as a dictionary key! Use tuples instead."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is an ordered, immutable collection in Python.", answer: "tuple" },
        { type: "true-false", question: "Dictionaries store data as key-value pairs.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which data structure does NOT allow duplicate values?", answer: "Set", choices: ["List", "Tuple", "Dictionary", "Set"] },
        { type: "match", question: "Match each data structure to its syntax:", answer: "", matchPairs: [["List", "[1, 2, 3]"], ["Tuple", "(1, 2, 3)"], ["Dictionary", "{'key': 'value'}"], ["Set", "{1, 2, 3}"]] },
        { type: "practice", question: "Create a Python program that stores student names and marks in a dictionary, then prints the student with the highest marks.", answer: "" },
      ]
    },
    {
      pageTitle: "Object-Oriented Programming",
      subtitle: "Classes, objects, and inheritance",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "Introduction to OOP",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
          body: "**Object-Oriented Programming (OOP)** is a programming paradigm that organizes code around objects rather than functions. Objects bundle data (attributes) and behavior (methods) together, mirroring how we think about real-world things.\n\nImagine a Car object: it has attributes like color, speed, and fuel level, and methods like start(), accelerate(), and brake(). OOP lets us model complex systems by breaking them into manageable, reusable pieces.\n\nPython is a fully object-oriented language — in fact, everything in Python is an object, including numbers, strings, and even functions!",
          illustration: [
            { emoji: "🏗️", label: "Class (Blueprint)" },
            { emoji: "📦", label: "Object (Instance)" },
            { emoji: "🔧", label: "Method (Function)" },
            { emoji: "📊", label: "Attribute (Data)" },
            { emoji: "🧬", label: "Inheritance" },
            { emoji: "🎭", label: "Polymorphism" }
          ],
          keyTerms: [
            { term: "Class", definition: "A blueprint or template for creating objects" },
            { term: "Object", definition: "An instance of a class with its own data" },
            { term: "Method", definition: "A function defined inside a class" },
            { term: "Attribute", definition: "A variable that belongs to an object" },
            { term: "__init__", definition: "The constructor method, called when creating an object" },
            { term: "self", definition: "Refers to the current instance of the class" }
          ]
        },
        {
          heading: "Creating Classes and Objects",
          body: "A **class** defines the structure, and an **object** is a concrete instance of that class. The `__init__` method is the constructor — it runs automatically when you create a new object and sets up the initial state.\n\nThe `self` parameter refers to the current instance. It lets each object maintain its own data separate from other objects of the same class.\n\nYou can create as many objects from a single class as you need, each with different data but sharing the same structure and behavior.",
          codeBlock: {
            language: "python",
            code: "class Student:\n    def __init__(self, name, grade, marks):\n        self.name = name\n        self.grade = grade\n        self.marks = marks\n        self.subjects = []\n    \n    def introduce(self):\n        return f'Hi, I am {self.name} in grade {self.grade}'\n    \n    def add_subject(self, subject):\n        self.subjects.append(subject)\n    \n    def average_marks(self):\n        if not self.marks:\n            return 0\n        return sum(self.marks) / len(self.marks)\n\n# Creating objects\nstu1 = Student('Aarav', 'A', [95, 88, 92])\nstu2 = Student('Priya', 'A', [90, 95, 98])\n\nprint(stu1.introduce())        # Hi, I am Aarav in grade A\nprint(stu2.average_marks())    # 94.33"
          },
          tip: "Always use meaningful names for classes (nouns like Student, Car, Book) and methods (verbs like calculate(), display(), save())."
        },
        {
          heading: "Inheritance and Polymorphism",
          body: "**Inheritance** allows a new class to inherit attributes and methods from an existing class. The original class is called the **parent** (or base) class, and the new class is the **child** (or derived) class.\n\nThis promotes code reuse — you write common functionality once in the parent class and extend it in child classes. **Polymorphism** means the same method name can behave differently in different classes.\n\nFor example, both a Dog and Cat class might have a `speak()` method, but a dog barks while a cat meows. The method name is the same, but the behavior differs.",
          codeBlock: {
            language: "python",
            code: "class Animal:\n    def __init__(self, name, species):\n        self.name = name\n        self.species = species\n    \n    def speak(self):\n        return f'{self.name} makes a sound'\n\nclass Dog(Animal):  # Inherits from Animal\n    def speak(self):  # Override parent method\n        return f'{self.name} says Woof!'\n\nclass Cat(Animal):\n    def speak(self):\n        return f'{self.name} says Meow!'\n\n# Polymorphism in action\nanimals = [Dog('Rex', 'Dog'), Cat('Whiskers', 'Cat')]\nfor animal in animals:\n    print(animal.speak())  # Each uses its own speak()"
          },
          comparison: {
            left: { title: "Without Inheritance", points: ["Duplicate code across similar classes", "Changes must be made in multiple places", "Harder to maintain and extend", "More error-prone"] },
            right: { title: "With Inheritance", points: ["Shared code in parent class", "Changes in one place affect all children", "Easy to add new types", "Follows DRY principle"] }
          },
          funFact: "Python supports multiple inheritance — a class can inherit from more than one parent class! This is rare in other languages like Java."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is a blueprint for creating objects in Python.", answer: "class" },
        { type: "true-false", question: "The __init__ method is called automatically when an object is created.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "What does 'self' refer to in a Python class?", answer: "The current instance of the class", choices: ["The class itself", "The current instance of the class", "The parent class", "A global variable"] },
        { type: "fill-in-blank", question: "When a child class redefines a parent's method, it is called method ___.", answer: "overriding" },
        { type: "practice", question: "Create a 'BankAccount' class with deposit() and withdraw() methods, then create a 'SavingsAccount' child class that adds interest calculation.", answer: "" },
      ]
    },
    {
      pageTitle: "File Handling & Error Management",
      subtitle: "Reading, writing files and handling exceptions",
      bannerColor: "from-teal-500 to-cyan-500",
      sections: [
        {
          heading: "Working with Files",
          image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&h=400&fit=crop",
          body: "Programs often need to read data from files or save results to files. Python makes file handling straightforward with built-in functions.\n\nFiles can be opened in different **modes**: read ('r'), write ('w'), append ('a'), and read+write ('r+'). The write mode creates a new file or overwrites an existing one, while append mode adds to the end without erasing existing content.\n\nThe most important best practice is using the `with` statement, which automatically closes the file when you're done — even if an error occurs. This prevents resource leaks and data corruption.",
          table: {
            headers: ["Mode", "Symbol", "Description", "Creates File?"],
            rows: [
              ["Read", "'r'", "Read only (default)", "No — error if missing"],
              ["Write", "'w'", "Write only — overwrites existing", "Yes"],
              ["Append", "'a'", "Write to end of file", "Yes"],
              ["Read+Write", "'r+'", "Both read and write", "No — error if missing"],
              ["Binary Read", "'rb'", "Read binary data (images, etc.)", "No"]
            ]
          },
          codeBlock: {
            language: "python",
            code: "# Writing to a file\nwith open('students.txt', 'w') as file:\n    file.write('Aarav - Grade A\\n')\n    file.write('Priya - Grade A+\\n')\n    file.write('Rohan - Grade B\\n')\n\n# Reading entire file\nwith open('students.txt', 'r') as file:\n    content = file.read()\n    print(content)\n\n# Reading line by line\nwith open('students.txt', 'r') as file:\n    for line in file:\n        name = line.strip().split(' - ')[0]\n        print(f'Student: {name}')\n\n# Appending to a file\nwith open('students.txt', 'a') as file:\n    file.write('Sneha - Grade A\\n')"
          },
          tip: "Always use 'with' statement for file operations — it automatically closes the file even if an error occurs."
        },
        {
          heading: "Working with CSV and JSON Files",
          body: "Real-world data often comes in structured formats like CSV (Comma-Separated Values) and JSON (JavaScript Object Notation). Python has built-in modules for both.\n\n**CSV files** are like spreadsheets — each line is a row and values are separated by commas. They're used for data exports, spreadsheets, and databases.\n\n**JSON files** store data in a hierarchical structure using key-value pairs and arrays. They're the standard for web APIs and configuration files.",
          codeBlock: {
            language: "python",
            code: "import csv\nimport json\n\n# Writing CSV\nwith open('marks.csv', 'w', newline='') as file:\n    writer = csv.writer(file)\n    writer.writerow(['Name', 'Maths', 'Science'])\n    writer.writerow(['Aarav', 95, 88])\n    writer.writerow(['Priya', 90, 95])\n\n# Reading CSV\nwith open('marks.csv', 'r') as file:\n    reader = csv.DictReader(file)\n    for row in reader:\n        print(f\"{row['Name']}: Maths={row['Maths']}\")\n\n# Writing JSON\ndata = {'students': [{'name': 'Aarav', 'marks': 95}]}\nwith open('data.json', 'w') as file:\n    json.dump(data, file, indent=2)\n\n# Reading JSON\nwith open('data.json', 'r') as file:\n    loaded = json.load(file)\n    print(loaded['students'][0]['name'])  # Aarav"
          },
          comparison: {
            left: { title: "CSV Files", points: ["Simple tabular data", "Easy to open in Excel", "Lightweight and fast", "Best for flat data"] },
            right: { title: "JSON Files", points: ["Hierarchical/nested data", "Standard for web APIs", "Human-readable", "Best for complex structures"] }
          }
        },
        {
          heading: "Exception Handling",
          body: "Errors are inevitable in programming. **Exception handling** lets your program deal with errors gracefully instead of crashing. Python uses `try`, `except`, `else`, and `finally` blocks.\n\nThe `try` block contains code that might cause an error. The `except` block runs if an error occurs. The `else` block runs only if no error occurred. The `finally` block always runs, regardless of errors — it's perfect for cleanup tasks.\n\nYou should catch **specific** exceptions rather than using a bare `except`, so you know exactly what went wrong.",
          codeBlock: {
            language: "python",
            code: "# Basic exception handling\ntry:\n    number = int(input('Enter a number: '))\n    result = 100 / number\nexcept ValueError:\n    print('That is not a valid number!')\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nelse:\n    print(f'Result: {result}')  # Only runs if no error\nfinally:\n    print('Program complete')   # Always runs\n\n# Raising your own exceptions\ndef set_age(age):\n    if age < 0:\n        raise ValueError('Age cannot be negative!')\n    if age > 150:\n        raise ValueError('Age seems unrealistic!')\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print(f'Error: {e}')"
          },
          keyTerms: [
            { term: "Exception", definition: "An error that occurs during program execution" },
            { term: "try/except", definition: "Blocks that handle errors gracefully" },
            { term: "raise", definition: "Manually trigger an exception" },
            { term: "finally", definition: "Code that always executes, error or not" }
          ],
          warningNote: "Never use a bare 'except:' without specifying the error type — it catches ALL errors including keyboard interrupts and system exits, making debugging very difficult."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The 'w' mode in file handling stands for ___ mode.", answer: "write" },
        { type: "true-false", question: "The 'finally' block runs regardless of whether an exception occurred.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which file format is best for hierarchical/nested data?", answer: "JSON", choices: ["CSV", "JSON", "TXT", "XML"] },
        { type: "fill-in-blank", question: "The ___ keyword is used to manually trigger an exception.", answer: "raise" },
        { type: "practice", question: "Write a Python program that reads a CSV file of student marks, calculates averages, and writes results to a JSON file. Include error handling for missing files.", answer: "" },
      ]
    },
    {
      pageTitle: "Advanced Functions & Modules",
      subtitle: "Lambda, decorators, and modular programming",
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "Advanced Function Concepts",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
          body: "Beyond basic functions, Python offers powerful functional programming features that make your code more concise and expressive.\n\n**Lambda functions** are small, anonymous functions defined in a single line. They're useful for short operations that don't need a full function definition. **Higher-order functions** like `map()`, `filter()`, and `sorted()` take other functions as arguments, enabling powerful data transformations.\n\n**Decorators** are a way to modify the behavior of functions without changing their code. They 'wrap' a function with additional functionality — common uses include logging, timing, and access control.",
          codeBlock: {
            language: "python",
            code: "# Lambda functions\nsquare = lambda x: x ** 2\nprint(square(5))  # 25\n\n# map() - apply function to every item\nnumbers = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x**2, numbers))  # [1, 4, 9, 16, 25]\n\n# filter() - keep items that match condition\nevens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]\n\n# sorted() with key function\nstudents = [('Priya', 95), ('Aarav', 88), ('Rohan', 92)]\nby_marks = sorted(students, key=lambda s: s[1], reverse=True)\n\n# Simple decorator\ndef timer(func):\n    import time\n    def wrapper(*args):\n        start = time.time()\n        result = func(*args)\n        print(f'{func.__name__} took {time.time()-start:.4f}s')\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    import time; time.sleep(1)\n    return 'Done'"
          },
          keyTerms: [
            { term: "Lambda", definition: "An anonymous function defined with the lambda keyword" },
            { term: "Higher-order function", definition: "A function that takes other functions as arguments" },
            { term: "Decorator", definition: "A function that modifies the behavior of another function" },
            { term: "map()", definition: "Applies a function to every item in an iterable" },
            { term: "filter()", definition: "Returns items that match a condition" }
          ]
        },
        {
          heading: "Modules and Packages",
          body: "As programs grow larger, organizing code into **modules** becomes essential. A module is simply a Python file containing functions, classes, and variables that can be imported into other files.\n\nPython comes with a rich **standard library** of built-in modules covering everything from math to web requests to file compression. You can also install third-party packages using `pip`, Python's package manager.\n\nCreating your own modules promotes code reuse and keeps projects organized. A **package** is a folder containing multiple modules with an `__init__.py` file.",
          codeBlock: {
            language: "python",
            code: "# Importing modules\nimport math\nprint(math.sqrt(144))     # 12.0\nprint(math.pi)            # 3.14159...\n\nfrom random import randint, choice\nprint(randint(1, 100))    # Random number 1-100\nprint(choice(['a','b']))  # Random choice\n\nfrom datetime import datetime\nnow = datetime.now()\nprint(now.strftime('%d-%m-%Y'))  # Formatted date\n\n# Creating your own module (save as myutils.py)\ndef greet(name):\n    return f'Hello, {name}!'\n\ndef calculate_average(numbers):\n    return sum(numbers) / len(numbers)\n\n# Using your module (in another file)\n# from myutils import greet, calculate_average"
          },
          illustration: [
            { emoji: "📐", label: "math" },
            { emoji: "🎲", label: "random" },
            { emoji: "📅", label: "datetime" },
            { emoji: "🌐", label: "requests" },
            { emoji: "📊", label: "csv/json" },
            { emoji: "🖥️", label: "os/sys" }
          ],
          tip: "Use `pip install package_name` to install third-party packages. Popular ones include requests (HTTP), pandas (data), and flask (web apps)."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ function is an anonymous function defined with the lambda keyword.", answer: "lambda" },
        { type: "true-false", question: "The map() function applies a function to every item in an iterable.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which function filters items based on a condition?", answer: "filter()", choices: ["map()", "filter()", "reduce()", "sort()"] },
        { type: "practice", question: "Create a module called 'mathtools.py' with functions for factorial, is_prime, and fibonacci. Import and use them in a main program.", answer: "" },
      ]
    },
    {
      pageTitle: "Python Best Practices & Debugging",
      subtitle: "Writing clean, maintainable, and bug-free code",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Writing Clean Python Code",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
          body: "Professional Python code follows established conventions that make it readable and maintainable. The **PEP 8** style guide is the official standard for Python code formatting.\n\nClean code is not just about making things work — it's about making things understandable. Code is read far more often than it's written, so clarity matters. Use descriptive variable names, keep functions focused on one task, and add docstrings to explain what your code does.\n\nThe Zen of Python (type `import this` in Python) summarizes the philosophy: 'Beautiful is better than ugly. Simple is better than complex. Readability counts.'",
          stepByStep: {
            steps: [
              { title: "Use descriptive names", description: "Write 'student_count' instead of 'sc'. Variables should explain their purpose." },
              { title: "Keep functions small", description: "Each function should do ONE thing well. If a function is over 20 lines, consider splitting it." },
              { title: "Add docstrings", description: "Every function and class should have a docstring explaining what it does, its parameters, and return value." },
              { title: "Follow PEP 8", description: "Use 4-space indentation, snake_case for variables/functions, PascalCase for classes, and UPPER_CASE for constants." },
              { title: "Handle errors gracefully", description: "Use try/except for operations that might fail. Never let your program crash without a helpful error message." }
            ]
          },
          codeBlock: {
            language: "python",
            code: "# BAD code\ndef f(l):\n    s=0\n    for i in l:\n        s+=i\n    return s/len(l)\n\n# GOOD code\ndef calculate_average(numbers: list) -> float:\n    \"\"\"Calculate the arithmetic mean of a list of numbers.\n    \n    Args:\n        numbers: A list of numeric values\n        \n    Returns:\n        The average of all numbers in the list\n        \n    Raises:\n        ValueError: If the list is empty\n    \"\"\"\n    if not numbers:\n        raise ValueError('Cannot average an empty list')\n    return sum(numbers) / len(numbers)"
          }
        },
        {
          heading: "Debugging Techniques",
          body: "Every programmer encounters bugs. The key skill is **systematic debugging** — methodically finding and fixing issues rather than making random changes.\n\n**Print debugging** is the simplest approach: add print statements to see what your code is doing at each step. **Using the debugger** (built into IDEs like VS Code and PyCharm) lets you step through code line by line and inspect variables.\n\n**Common Python errors** include NameError (undefined variable), TypeError (wrong data type), IndexError (list index out of range), and KeyError (missing dictionary key). Reading error messages carefully is half the battle — Python tells you exactly what went wrong and on which line.",
          table: {
            headers: ["Error Type", "Cause", "Example", "Fix"],
            rows: [
              ["NameError", "Undefined variable", "`print(x)` when x not defined", "Define variable before use"],
              ["TypeError", "Wrong data type", "`'5' + 3` (string + int)", "Convert types: `int('5') + 3`"],
              ["IndexError", "Index out of range", "`lst[10]` when list has 5 items", "Check length before accessing"],
              ["KeyError", "Missing dict key", "`d['missing']`", "Use `.get('key', default)`"],
              ["ValueError", "Invalid value", "`int('hello')`", "Validate input before converting"]
            ]
          },
          tip: "When debugging, start by reproducing the bug consistently. Then add print statements to narrow down WHERE the problem occurs before trying to fix it."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ is the official Python style guide for code formatting.", answer: "PEP 8" },
        { type: "true-false", question: "Functions in Python should use PascalCase naming.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "What error occurs when accessing a list index that doesn't exist?", answer: "IndexError", choices: ["KeyError", "IndexError", "ValueError", "TypeError"] },
        { type: "practice", question: "Take a buggy program (with at least 5 intentional errors) and debug it systematically. Document each bug found and how you fixed it.", answer: "" },
      ]
    }
  ]
};

// ======================== CLASS 9: WEB DEVELOPMENT ========================
const c9WebDev: TopicTextbook = {
  topicId: "c9-web-dev",
  topicTitle: "Web Development with HTML, CSS & JavaScript",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "HTML Fundamentals",
      subtitle: "The structure and skeleton of every website",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Understanding HTML",
          image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
          body: "**HTML (HyperText Markup Language)** is the foundation of every website. It defines the structure and content — headings, paragraphs, images, links, forms, and more. Every web page you visit is built with HTML at its core.\n\nHTML uses **tags** to define elements. Tags come in pairs: an opening tag `<p>` and a closing tag `</p>`, with content in between. Some tags are self-closing like `<img />` and `<br />`.\n\nA well-structured HTML document has a `<head>` (metadata, title, styles) and a `<body>` (visible content). Understanding HTML is the essential first step for any web developer.",
          illustration: [
            { emoji: "🏗️", label: "HTML (Structure)" },
            { emoji: "🎨", label: "CSS (Style)" },
            { emoji: "⚡", label: "JS (Behavior)" },
            { emoji: "🌐", label: "Browser" }
          ],
          codeBlock: {
            language: "html",
            code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>My First Website</title>\n</head>\n<body>\n    <header>\n        <h1>Welcome to My Website</h1>\n        <nav>\n            <a href=\"#about\">About</a>\n            <a href=\"#contact\">Contact</a>\n        </nav>\n    </header>\n    <main>\n        <section id=\"about\">\n            <h2>About Me</h2>\n            <p>Hello! I am learning web development.</p>\n            <img src=\"photo.jpg\" alt=\"My photo\" />\n        </section>\n    </main>\n    <footer>\n        <p>&copy; 2025 My Website</p>\n    </footer>\n</body>\n</html>"
          },
          keyTerms: [
            { term: "Tag", definition: "An HTML element defined by angle brackets, e.g. <p>, <div>" },
            { term: "Attribute", definition: "Additional info in a tag, e.g. class, id, src, href" },
            { term: "Semantic HTML", definition: "Using meaningful tags like <nav>, <article>, <footer> instead of generic <div>" },
            { term: "DOM", definition: "Document Object Model — the tree structure of HTML elements" }
          ]
        },
        {
          heading: "HTML Forms and Tables",
          body: "**Forms** allow users to input data — login forms, search boxes, surveys, and registration pages all use HTML forms. Each form element (input, textarea, select) collects specific types of data.\n\n**Tables** organize data into rows and columns — perfect for schedules, comparison charts, and data displays. While tables shouldn't be used for page layout (use CSS for that), they're essential for presenting tabular data.\n\nForms and tables together enable powerful data-driven websites where users can submit information and view structured data.",
          codeBlock: {
            language: "html",
            code: "<!-- Form Example -->\n<form action=\"/submit\" method=\"POST\">\n    <label for=\"name\">Name:</label>\n    <input type=\"text\" id=\"name\" required />\n    \n    <label for=\"email\">Email:</label>\n    <input type=\"email\" id=\"email\" required />\n    \n    <label>Grade:</label>\n    <select name=\"grade\">\n        <option value=\"9\">Class 9</option>\n        <option value=\"10\">Class 10</option>\n    </select>\n    \n    <button type=\"submit\">Submit</button>\n</form>\n\n<!-- Table Example -->\n<table>\n    <thead>\n        <tr><th>Name</th><th>Subject</th><th>Marks</th></tr>\n    </thead>\n    <tbody>\n        <tr><td>Aarav</td><td>Maths</td><td>95</td></tr>\n        <tr><td>Priya</td><td>Science</td><td>98</td></tr>\n    </tbody>\n</table>"
          },
          tip: "Always add the 'required' attribute to important form fields and use the correct input types (email, number, date) for built-in validation."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "HTML stands for HyperText ___ Language.", answer: "markup" },
        { type: "true-false", question: "The <head> section contains the visible content of a web page.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which tag creates a hyperlink?", answer: "<a>", choices: ["<link>", "<a>", "<href>", "<url>"] },
        { type: "practice", question: "Create a student registration form with fields for name, email, class, section, and a submit button. Add proper labels and validation.", answer: "" },
      ]
    },
    {
      pageTitle: "CSS Styling & Layouts",
      subtitle: "Making websites beautiful and responsive",
      bannerColor: "from-indigo-500 to-violet-500",
      sections: [
        {
          heading: "CSS Fundamentals",
          image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
          body: "**CSS (Cascading Style Sheets)** controls how HTML elements look — colors, fonts, spacing, sizes, backgrounds, and animations. Without CSS, websites would be plain black text on white backgrounds.\n\nCSS works with **selectors** (which elements to style), **properties** (what to change), and **values** (how to change it). Styles can be applied inline, in a `<style>` tag, or in external `.css` files (recommended for maintainability).\n\nThe 'cascading' in CSS means styles can inherit and override each other based on specificity — inline styles override classes, which override tag selectors.",
          codeBlock: {
            language: "css",
            code: "/* Element selector */\nbody {\n    font-family: 'Segoe UI', sans-serif;\n    background-color: #f5f5f5;\n    color: #333;\n    line-height: 1.6;\n}\n\n/* Class selector */\n.card {\n    background: white;\n    border-radius: 12px;\n    padding: 24px;\n    box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n    transition: transform 0.3s ease;\n}\n\n.card:hover {\n    transform: translateY(-4px);\n}\n\n/* ID selector */\n#hero {\n    background: linear-gradient(135deg, #667eea, #764ba2);\n    color: white;\n    text-align: center;\n    padding: 80px 20px;\n}\n\n/* Pseudo-classes */\na:hover { color: #667eea; }\ninput:focus { border-color: #667eea; outline: none; }"
          },
          table: {
            headers: ["Selector", "Syntax", "Specificity", "Example"],
            rows: [
              ["Element", "tag", "Low", "`p { color: blue; }`"],
              ["Class", ".class", "Medium", "`.card { padding: 20px; }`"],
              ["ID", "#id", "High", "`#hero { font-size: 2em; }`"],
              ["Inline", "style=\"\"", "Highest", "`style=\"color: red;\"`"]
            ]
          }
        },
        {
          heading: "Flexbox and Grid Layouts",
          body: "Modern CSS layout systems — **Flexbox** and **Grid** — make it easy to create complex, responsive layouts that were previously difficult or impossible.\n\n**Flexbox** works in one dimension (row OR column) and is perfect for navigation bars, card rows, centering content, and distributing space. **CSS Grid** works in two dimensions (rows AND columns simultaneously) and is ideal for full page layouts, photo galleries, and dashboard designs.\n\nBoth are responsive by default — elements automatically adjust to available space. Combined with media queries, you can create websites that look perfect on any screen size.",
          codeBlock: {
            language: "css",
            code: "/* Flexbox — one-dimensional layout */\n.navbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 16px 32px;\n}\n\n.card-row {\n    display: flex;\n    gap: 20px;\n    flex-wrap: wrap;  /* Wrap to next line */\n}\n\n.card-row > .card {\n    flex: 1 1 300px;  /* Grow, shrink, min-width */\n}\n\n/* CSS Grid — two-dimensional layout */\n.dashboard {\n    display: grid;\n    grid-template-columns: 250px 1fr 300px;\n    grid-template-rows: 60px 1fr 40px;\n    gap: 16px;\n    height: 100vh;\n}\n\n.photo-gallery {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n    gap: 12px;\n}"
          },
          comparison: {
            left: { title: "Flexbox", points: ["One-dimensional (row or column)", "Great for component layouts", "Content-based sizing", "Best for navigation, card rows, centering"] },
            right: { title: "CSS Grid", points: ["Two-dimensional (rows and columns)", "Great for page layouts", "Track-based sizing", "Best for dashboards, galleries, complex layouts"] }
          },
          tip: "Use Flexbox for components (navbars, card rows) and Grid for page layouts. They work great together!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "CSS stands for Cascading ___ Sheets.", answer: "style" },
        { type: "true-false", question: "Flexbox is a two-dimensional layout system.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which CSS property creates a flexible container?", answer: "display: flex", choices: ["display: block", "display: flex", "display: inline", "display: float"] },
        { type: "practice", question: "Create a responsive portfolio page with a navigation bar (Flexbox), a photo gallery (Grid), and styled cards.", answer: "" },
      ]
    },
    {
      pageTitle: "JavaScript Essentials",
      subtitle: "Adding interactivity and dynamic behavior",
      bannerColor: "from-violet-500 to-purple-500",
      sections: [
        {
          heading: "JavaScript Basics",
          body: "**JavaScript** is the programming language of the web. While HTML defines structure and CSS defines style, JavaScript makes pages **interactive** — responding to clicks, validating forms, updating content dynamically, and communicating with servers.\n\nJavaScript runs directly in the browser — no installation needed. It can manipulate the HTML (DOM), handle events, store data, perform calculations, and even create animations. It's the most widely used programming language in the world.\n\nModern JavaScript (ES6+) introduced powerful features like `let`/`const`, arrow functions, template literals, destructuring, and more that make code cleaner and more readable.",
          codeBlock: {
            language: "javascript",
            code: "// Variables\nlet studentName = 'Aarav';   // Can change\nconst maxMarks = 100;         // Cannot change\n\n// Template literals\nconsole.log(`${studentName} scored ${85}/${maxMarks}`);\n\n// Arrow functions\nconst greet = (name) => `Hello, ${name}!`;\nconst square = (n) => n ** 2;\n\n// Arrays and methods\nconst marks = [95, 88, 92, 78, 85];\nconst total = marks.reduce((sum, m) => sum + m, 0);\nconst average = total / marks.length;\nconst passed = marks.filter(m => m >= 80);\nconst doubled = marks.map(m => m * 2);\n\n// Objects\nconst student = {\n    name: 'Aarav',\n    grade: 'A',\n    greet() {\n        return `Hi, I'm ${this.name}`;\n    }\n};"
          },
          keyTerms: [
            { term: "let / const", definition: "Modern variable declarations; let changes, const is fixed" },
            { term: "Arrow function", definition: "Short function syntax: (params) => expression" },
            { term: "Template literal", definition: "String with embedded expressions: `Hello, ${name}`" },
            { term: "Array methods", definition: "Built-in functions like map, filter, reduce for data transformation" }
          ]
        },
        {
          heading: "DOM Manipulation and Events",
          body: "The **Document Object Model (DOM)** is a tree-like representation of your HTML page. JavaScript can read, modify, add, and remove any element in this tree — this is how dynamic websites work.\n\n**Event handling** lets your code respond to user actions — clicks, key presses, mouse movements, form submissions, and more. You 'listen' for events on elements and run callback functions when they occur.\n\nCombining DOM manipulation with events creates interactive experiences: clicking a button shows a popup, typing in a search box filters results in real-time, submitting a form validates data before sending.",
          codeBlock: {
            language: "javascript",
            code: "// Selecting elements\nconst heading = document.getElementById('title');\nconst buttons = document.querySelectorAll('.btn');\nconst form = document.querySelector('#myForm');\n\n// Changing content and styles\nheading.textContent = 'Updated Title';\nheading.style.color = '#667eea';\nheading.classList.add('highlight');\n\n// Creating new elements\nconst newCard = document.createElement('div');\nnewCard.className = 'card';\nnewCard.innerHTML = '<h3>New Card</h3><p>Dynamic content!</p>';\ndocument.body.appendChild(newCard);\n\n// Event listeners\nconst btn = document.getElementById('submitBtn');\nbtn.addEventListener('click', () => {\n    alert('Button clicked!');\n});\n\n// Form handling\nform.addEventListener('submit', (e) => {\n    e.preventDefault();  // Stop page reload\n    const name = document.getElementById('name').value;\n    console.log(`Submitted: ${name}`);\n});"
          },
          illustration: [
            { emoji: "🖱️", label: "click" },
            { emoji: "⌨️", label: "keypress" },
            { emoji: "📝", label: "submit" },
            { emoji: "🖼️", label: "load" },
            { emoji: "↕️", label: "scroll" },
            { emoji: "🔄", label: "change" }
          ],
          funFact: "JavaScript was created in just 10 days by Brendan Eich in 1995! Despite its rushed creation, it became the world's most popular programming language."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "JavaScript uses ___ to respond to user actions like clicks.", answer: "events" },
        { type: "true-false", question: "CSS defines the structure of a web page.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which method selects an element by its ID?", answer: "getElementById()", choices: ["querySelector()", "getElementById()", "getElement()", "selectById()"] },
        { type: "practice", question: "Create a web page with an input field, a button, and a list. When the button is clicked, add the input text as a new list item. Include a delete button for each item.", answer: "" },
      ]
    },
    {
      pageTitle: "Responsive Design & Modern CSS",
      subtitle: "Making websites work on all devices",
      bannerColor: "from-purple-500 to-pink-500",
      sections: [
        {
          heading: "Responsive Web Design",
          body: "**Responsive design** ensures websites look great on all screen sizes — phones, tablets, and desktops. With over 60% of web traffic coming from mobile devices, responsive design is no longer optional.\n\n**Media queries** let you apply different styles based on screen width, height, orientation, and more. The **mobile-first** approach starts with mobile styles and adds complexity for larger screens.\n\n**Relative units** (%, em, rem, vw, vh) adapt to the viewport, while fixed units (px) stay the same regardless of screen size. Using relative units is key to fluid, responsive layouts.",
          codeBlock: {
            language: "css",
            code: "/* Mobile-first approach */\n.container {\n    padding: 16px;\n    max-width: 1200px;\n    margin: 0 auto;\n}\n\n.grid {\n    display: grid;\n    grid-template-columns: 1fr;  /* Single column on mobile */\n    gap: 16px;\n}\n\n/* Tablet */\n@media (min-width: 768px) {\n    .grid {\n        grid-template-columns: repeat(2, 1fr);  /* 2 columns */\n    }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n    .grid {\n        grid-template-columns: repeat(3, 1fr);  /* 3 columns */\n    }\n}\n\n/* Responsive images */\nimg {\n    max-width: 100%;\n    height: auto;\n}\n\n/* Responsive typography */\nh1 { font-size: clamp(1.5rem, 4vw, 3rem); }"
          },
          table: {
            headers: ["Unit", "Type", "Relative To", "Best For"],
            rows: [
              ["px", "Fixed", "Nothing", "Borders, shadows"],
              ["%", "Relative", "Parent element", "Widths, padding"],
              ["em", "Relative", "Parent font size", "Component spacing"],
              ["rem", "Relative", "Root font size", "Global spacing, fonts"],
              ["vw/vh", "Relative", "Viewport width/height", "Full-screen sections"],
              ["clamp()", "Dynamic", "Min, preferred, max", "Responsive typography"]
            ]
          },
          tip: "Always design mobile-first — start with the smallest screen and add complexity for larger screens using min-width media queries."
        },
        {
          heading: "CSS Animations and Transitions",
          body: "**Animations** bring websites to life. CSS provides two approaches: **transitions** for simple state changes (hover effects, color changes) and **keyframe animations** for complex, multi-step sequences.\n\nTransitions smoothly animate between two states — they're perfect for hover effects, focus states, and toggling visibility. Keyframe animations define multiple steps and can run on loop, making them ideal for loading spinners, attention-grabbing effects, and decorative elements.\n\nWell-used animations improve user experience by providing visual feedback and guiding attention. But overusing them causes distraction and can hurt accessibility.",
          codeBlock: {
            language: "css",
            code: "/* Transitions — smooth state changes */\n.button {\n    background: #667eea;\n    color: white;\n    padding: 12px 24px;\n    border-radius: 8px;\n    transition: all 0.3s ease;\n}\n\n.button:hover {\n    background: #764ba2;\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);\n}\n\n/* Keyframe animations */\n@keyframes fadeInUp {\n    from {\n        opacity: 0;\n        transform: translateY(20px);\n    }\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n}\n\n.card {\n    animation: fadeInUp 0.6s ease forwards;\n}\n\n@keyframes pulse {\n    0%, 100% { transform: scale(1); }\n    50% { transform: scale(1.05); }\n}\n\n.highlight {\n    animation: pulse 2s infinite;\n}"
          },
          comparison: {
            left: { title: "Transitions", points: ["Two states (from → to)", "Triggered by state change (hover, focus)", "Simple and performant", "Best for hover effects, toggles"] },
            right: { title: "Keyframe Animations", points: ["Multiple steps (0% → 50% → 100%)", "Can auto-play and loop", "More complex, more control", "Best for loading, decorative effects"] }
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "CSS ___ allow applying styles based on screen size.", answer: "media queries" },
        { type: "true-false", question: "The mobile-first approach starts with desktop styles.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which CSS unit is relative to the root font size?", answer: "rem", choices: ["px", "em", "rem", "vw"] },
        { type: "practice", question: "Create a responsive photo gallery that shows 1 column on mobile, 2 on tablet, and 3 on desktop. Add hover animations to each photo card.", answer: "" },
      ]
    }
  ]
};

// ======================== CLASS 9: SQL & DATABASES ========================
const c9SqlDb: TopicTextbook = {
  topicId: "c9-sql-db",
  topicTitle: "Introduction to Databases & SQL",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Understanding Databases",
      subtitle: "Why we need organized data storage",
      bannerColor: "from-purple-500 to-violet-500",
      sections: [
        {
          heading: "What is a Database?",
          body: "A **database** is an organized collection of data stored electronically, designed for easy access, management, and updating. Before databases, data was stored in paper files — imagine searching through thousands of folders to find one student's record!\n\nDatabases solve this by providing **structured storage** with instant search capabilities. Every app you use — Instagram, YouTube, WhatsApp — relies on databases to store and retrieve data quickly.\n\nDatabases are managed by **Database Management Systems (DBMS)** — software that handles data storage, retrieval, security, and multiple users accessing data simultaneously.",
          illustration: [
            { emoji: "📋", label: "Tables" },
            { emoji: "🔍", label: "Queries" },
            { emoji: "🔒", label: "Security" },
            { emoji: "👥", label: "Multi-user" },
            { emoji: "💾", label: "Storage" },
            { emoji: "⚡", label: "Speed" }
          ],
          keyTerms: [
            { term: "Database", definition: "An organized collection of structured data" },
            { term: "DBMS", definition: "Database Management System — software to manage databases" },
            { term: "Table", definition: "A collection of related data organized in rows and columns" },
            { term: "Record/Row", definition: "A single entry in a table (one student, one order)" },
            { term: "Field/Column", definition: "A specific attribute (name, age, grade)" },
            { term: "Primary Key", definition: "A unique identifier for each record (student ID)" }
          ]
        },
        {
          heading: "Types of Databases",
          body: "There are several types of databases, each designed for different use cases. **Relational databases** (SQL) are the most common — they store data in tables with defined relationships between them.\n\n**NoSQL databases** offer flexible structures for unstructured data like social media posts, sensor readings, and real-time data. They sacrifice some data integrity for speed and scalability.\n\nChoosing the right database type depends on your data structure, scale requirements, and how you'll query the data.",
          comparison: {
            left: { title: "Relational (SQL)", points: ["Data in structured tables", "Strong data integrity", "ACID compliance (reliable transactions)", "Best for banking, inventory, school records", "Examples: MySQL, PostgreSQL, SQLite"] },
            right: { title: "NoSQL", points: ["Flexible data structures", "Scales horizontally (many servers)", "Eventually consistent", "Best for social media, IoT, real-time apps", "Examples: MongoDB, Firebase, Redis"] }
          },
          funFact: "The world's largest databases store petabytes of data — that's over 1 million gigabytes! Google processes over 8.5 billion searches per day using massive distributed databases."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ key uniquely identifies each record in a table.", answer: "primary" },
        { type: "true-false", question: "NoSQL databases store data in traditional tables.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which is an example of a relational database?", answer: "MySQL", choices: ["MongoDB", "MySQL", "Redis", "Firebase"] },
        { type: "match", question: "Match database types to their strengths:", answer: "", matchPairs: [["SQL", "Strong data integrity"], ["NoSQL", "Flexible structure"], ["SQLite", "Lightweight, file-based"], ["Redis", "In-memory, ultra-fast"]] },
      ]
    },
    {
      pageTitle: "SQL Fundamentals",
      subtitle: "Creating, reading, updating, and deleting data",
      bannerColor: "from-violet-500 to-indigo-500",
      sections: [
        {
          heading: "Creating Tables and Inserting Data",
          body: "**SQL (Structured Query Language)** is the standard language for interacting with relational databases. It lets you create tables, insert data, query information, update records, and delete data.\n\nThe `CREATE TABLE` statement defines a table's structure — column names, data types, and constraints. **Data types** specify what kind of data each column holds (text, numbers, dates), and **constraints** enforce rules (NOT NULL means a value is required, UNIQUE means no duplicates).\n\nThe `INSERT INTO` statement adds new records. You can insert one row at a time or multiple rows in a single statement.",
          codeBlock: {
            language: "sql",
            code: "-- Create a students table\nCREATE TABLE students (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(100) NOT NULL,\n    age INT CHECK (age > 0),\n    grade CHAR(2),\n    email VARCHAR(150) UNIQUE,\n    enrollment_date DATE DEFAULT CURRENT_DATE\n);\n\n-- Insert single record\nINSERT INTO students (name, age, grade, email)\nVALUES ('Aarav Sharma', 15, 'A', 'aarav@school.com');\n\n-- Insert multiple records\nINSERT INTO students (name, age, grade, email) VALUES\n    ('Priya Singh', 15, 'A+', 'priya@school.com'),\n    ('Rohan Kumar', 14, 'B', 'rohan@school.com'),\n    ('Sneha Patel', 15, 'A', 'sneha@school.com');"
          },
          table: {
            headers: ["Data Type", "Description", "Example"],
            rows: [
              ["INT", "Whole numbers", "age INT"],
              ["VARCHAR(n)", "Variable-length text (max n chars)", "name VARCHAR(100)"],
              ["CHAR(n)", "Fixed-length text (exactly n chars)", "grade CHAR(2)"],
              ["DATE", "Calendar date", "enrollment_date DATE"],
              ["DECIMAL(p,s)", "Precise numbers with decimals", "price DECIMAL(10,2)"],
              ["BOOLEAN", "True or False", "is_active BOOLEAN"]
            ]
          }
        },
        {
          heading: "Querying Data with SELECT",
          body: "The `SELECT` statement is the most used SQL command — it retrieves data from tables. You can select specific columns, filter rows with `WHERE`, sort results with `ORDER BY`, limit output with `LIMIT`, and perform calculations with aggregate functions.\n\n**WHERE** filters rows based on conditions using comparison operators (=, >, <, >=, <=, !=) and logical operators (AND, OR, NOT). **ORDER BY** sorts results ascending (ASC) or descending (DESC).\n\n**Aggregate functions** calculate values across multiple rows: COUNT counts rows, SUM adds values, AVG calculates averages, MIN/MAX find extremes. GROUP BY groups rows before aggregating.",
          codeBlock: {
            language: "sql",
            code: "-- Select all columns\nSELECT * FROM students;\n\n-- Select specific columns with conditions\nSELECT name, grade FROM students\nWHERE age >= 15 AND grade IN ('A', 'A+')\nORDER BY name ASC;\n\n-- Aggregate functions\nSELECT \n    grade,\n    COUNT(*) AS student_count,\n    AVG(age) AS average_age\nFROM students\nGROUP BY grade\nHAVING COUNT(*) > 1;\n\n-- Pattern matching\nSELECT * FROM students\nWHERE name LIKE 'A%'      -- Names starting with A\n   OR email LIKE '%school%';  -- Emails containing 'school'\n\n-- Limiting results\nSELECT * FROM students\nORDER BY age DESC\nLIMIT 5;"
          },
          tip: "Use `LIKE` with wildcards for pattern matching: `%` matches any characters, `_` matches exactly one character."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "SQL stands for Structured ___ Language.", answer: "query" },
        { type: "true-false", question: "The WHERE clause filters rows in a SELECT statement.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which SQL function counts the number of rows?", answer: "COUNT()", choices: ["SUM()", "COUNT()", "TOTAL()", "NUM()"] },
        { type: "practice", question: "Create a 'library' table with columns for id, title, author, year, and genre. Insert 10 books and write queries to find all books by a specific author, books published after 2000, and count books per genre.", answer: "" },
      ]
    },
    {
      pageTitle: "Advanced SQL Operations",
      subtitle: "Updating, deleting, and joining tables",
      bannerColor: "from-indigo-500 to-blue-500",
      sections: [
        {
          heading: "UPDATE and DELETE Operations",
          body: "**UPDATE** modifies existing records, and **DELETE** removes records from a table. Both are powerful but dangerous — always use a WHERE clause to target specific rows, or you'll affect the entire table!\n\nBefore running UPDATE or DELETE, it's good practice to first run a SELECT with the same WHERE condition to verify which rows will be affected. Many databases support **transactions** — you can wrap changes in BEGIN/COMMIT blocks and ROLLBACK if something goes wrong.",
          codeBlock: {
            language: "sql",
            code: "-- Update specific records\nUPDATE students \nSET grade = 'A+', age = 16\nWHERE name = 'Aarav Sharma';\n\n-- Update with calculation\nUPDATE products \nSET price = price * 1.1  -- 10% price increase\nWHERE category = 'electronics';\n\n-- Delete specific records\nDELETE FROM students \nWHERE grade = 'F' AND age > 18;\n\n-- SAFE APPROACH: Check first!\nSELECT * FROM students WHERE grade = 'F';  -- See what will be deleted\nDELETE FROM students WHERE grade = 'F';     -- Then delete\n\n-- Using transactions\nBEGIN;\n    UPDATE accounts SET balance = balance - 500 WHERE id = 1;\n    UPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;  -- Or ROLLBACK if something went wrong"
          },
          warningNote: "NEVER run UPDATE or DELETE without a WHERE clause! `DELETE FROM students;` would delete ALL students — there's no undo button!"
        },
        {
          heading: "JOIN Operations",
          body: "Real databases have multiple related tables. **JOINs** combine data from two or more tables based on a related column (usually a foreign key).\n\n**INNER JOIN** returns only matching rows from both tables. **LEFT JOIN** returns all rows from the left table plus matching rows from the right (missing data becomes NULL). **RIGHT JOIN** is the opposite. **FULL JOIN** returns all rows from both tables.\n\nJOINs are essential for working with normalized databases where data is split across tables to avoid duplication.",
          codeBlock: {
            language: "sql",
            code: "-- Two related tables\nCREATE TABLE classes (\n    id INT PRIMARY KEY,\n    class_name VARCHAR(50),\n    teacher VARCHAR(100)\n);\n\n-- students table has a class_id foreign key\nALTER TABLE students ADD class_id INT REFERENCES classes(id);\n\n-- INNER JOIN: Only students with a class\nSELECT s.name, s.grade, c.class_name, c.teacher\nFROM students s\nINNER JOIN classes c ON s.class_id = c.id;\n\n-- LEFT JOIN: All students, even without a class\nSELECT s.name, c.class_name\nFROM students s\nLEFT JOIN classes c ON s.class_id = c.id;\n\n-- Multiple JOINs\nSELECT s.name, c.class_name, m.subject, m.score\nFROM students s\nJOIN classes c ON s.class_id = c.id\nJOIN marks m ON s.id = m.student_id\nWHERE m.score > 90;"
          },
          illustration: [
            { emoji: "⬛", label: "INNER JOIN" },
            { emoji: "⬜", label: "LEFT JOIN" },
            { emoji: "◻️", label: "RIGHT JOIN" },
            { emoji: "🔲", label: "FULL JOIN" }
          ]
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ JOIN returns only matching rows from both tables.", answer: "inner" },
        { type: "true-false", question: "DELETE without WHERE removes all rows from a table.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which JOIN returns all rows from the left table?", answer: "LEFT JOIN", choices: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"] },
        { type: "practice", question: "Create a school database with tables for students, classes, and marks. Use JOINs to list each student's name, class, and average marks.", answer: "" },
      ]
    },
    {
      pageTitle: "Database Design Principles",
      subtitle: "Designing efficient and reliable databases",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Normalization",
          body: "**Normalization** is the process of organizing database tables to reduce data redundancy (duplication) and improve data integrity. Poorly designed databases have the same information stored in multiple places, leading to inconsistencies when data is updated.\n\nThe most common normal forms are:\n- **1NF (First Normal Form):** Each cell contains a single value, no repeating groups\n- **2NF (Second Normal Form):** 1NF + all non-key columns depend on the entire primary key\n- **3NF (Third Normal Form):** 2NF + no non-key column depends on another non-key column\n\nFor most applications, achieving 3NF is sufficient. Over-normalizing can make queries too complex, so balance is key.",
          stepByStep: {
            steps: [
              { title: "Identify entities", description: "Determine the main objects (students, courses, teachers) that need separate tables." },
              { title: "Define attributes", description: "List all data fields for each entity. Choose appropriate data types and constraints." },
              { title: "Set primary keys", description: "Every table needs a unique identifier. Use auto-increment IDs or natural keys." },
              { title: "Establish relationships", description: "Connect tables with foreign keys. Determine one-to-one, one-to-many, or many-to-many relationships." },
              { title: "Normalize to 3NF", description: "Remove duplication by splitting data into related tables. Each fact should be stored in exactly one place." }
            ]
          },
          tip: "A good rule: if you find yourself copying the same data into multiple rows, it probably needs its own table with a foreign key relationship."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ is the process of organizing tables to reduce data duplication.", answer: "normalization" },
        { type: "true-false", question: "A foreign key links two related tables together.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Design a complete database for an online bookstore with tables for books, authors, customers, orders, and order_items. Draw the relationships and write the CREATE TABLE statements.", answer: "" },
      ]
    }
  ]
};

// ======================== CLASS 9: CYBERSECURITY ========================
const c9Cybersec: TopicTextbook = {
  topicId: "c9-cybersec",
  topicTitle: "Cybersecurity Basics",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Introduction to Cybersecurity",
      subtitle: "Understanding digital threats and protection",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Why Cybersecurity Matters",
          body: "**Cybersecurity** is the practice of protecting computers, networks, and data from digital attacks, theft, and damage. In today's connected world, where we bank online, store personal photos in the cloud, and communicate digitally, cybersecurity affects everyone.\n\nCyber attacks can steal your personal data, empty your bank account, lock you out of your own files, or even disrupt hospitals and power grids. Understanding cybersecurity isn't just for tech experts — it's an essential life skill.\n\nThe CIA triad forms the foundation of cybersecurity: **Confidentiality** (only authorized people access data), **Integrity** (data is accurate and unchanged), and **Availability** (systems are accessible when needed).",
          illustration: [
            { emoji: "🔒", label: "Confidentiality" },
            { emoji: "✅", label: "Integrity" },
            { emoji: "🌐", label: "Availability" },
            { emoji: "🛡️", label: "Defense" },
            { emoji: "🔑", label: "Authentication" },
            { emoji: "📜", label: "Authorization" }
          ],
          youtubeId: "inWWhr5tnEA",
          keyTerms: [
            { term: "Cybersecurity", definition: "Protecting systems, networks, and data from digital attacks" },
            { term: "CIA Triad", definition: "Confidentiality, Integrity, Availability — the three pillars of security" },
            { term: "Threat", definition: "A potential danger to data or systems" },
            { term: "Vulnerability", definition: "A weakness that can be exploited by threats" },
            { term: "Encryption", definition: "Converting data into a coded form that only authorized parties can read" }
          ]
        },
        {
          heading: "Common Cyber Threats",
          body: "Understanding threats is the first step to defending against them. Cyber attacks come in many forms, each targeting different vulnerabilities.\n\n**Malware** is malicious software designed to damage or gain unauthorized access. It includes viruses (attach to files), worms (spread automatically), trojans (disguised as legitimate software), and ransomware (encrypts files for payment).\n\n**Social engineering** attacks manipulate people rather than technology. Phishing emails, fake websites, and impersonation calls trick victims into revealing passwords or sending money. These are the most common and successful attacks because they exploit human psychology.",
          table: {
            headers: ["Threat", "How It Works", "Example", "Prevention"],
            rows: [
              ["🦠 Malware", "Malicious software infects system", "Virus in email attachment", "Antivirus, don't download unknown files"],
              ["🎣 Phishing", "Fake emails/sites steal info", "Fake bank login page", "Check URLs, never click suspicious links"],
              ["🔑 Password Attack", "Guessing/cracking passwords", "Brute force, dictionary attack", "Strong passwords, 2FA"],
              ["💰 Ransomware", "Encrypts files, demands payment", "WannaCry attack (2017)", "Backups, security updates"],
              ["🕵️ Spyware", "Secretly monitors activity", "Keylogger recording passwords", "Anti-spyware, careful with downloads"],
              ["📡 Man-in-Middle", "Intercepts communication", "Fake WiFi hotspot", "Use HTTPS, avoid public WiFi for banking"]
            ]
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The CIA triad stands for Confidentiality, Integrity, and ___.", answer: "availability" },
        { type: "true-false", question: "Phishing attacks use fake emails to trick users into revealing passwords.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which type of malware disguises itself as legitimate software?", answer: "Trojan", choices: ["Virus", "Worm", "Trojan", "Spyware"] },
      ]
    },
    {
      pageTitle: "Staying Safe Online",
      subtitle: "Practical defense strategies for everyday use",
      bannerColor: "from-red-500 to-orange-500",
      sections: [
        {
          heading: "Password Security",
          body: "Passwords are the front door to your digital life. A weak password is like leaving your house unlocked. **Strong passwords** should be at least 12 characters long and include a mix of uppercase, lowercase, numbers, and symbols.\n\nEven better than passwords are **passphrases** — memorable sentences that are long and unique. 'MyDogLoves2PlayInThe_Rain!' is far stronger than 'P@ssw0rd123'.\n\n**Password managers** (like Bitwarden, LastPass) generate and store unique passwords for every account. You only need to remember one master password. **Two-Factor Authentication (2FA)** adds a second layer of security — even if someone knows your password, they can't access your account without the second factor.",
          stepByStep: {
            steps: [
              { title: "Create strong passwords", description: "Use 12+ characters with uppercase, lowercase, numbers, and symbols. Or use a passphrase like 'Sunset-Ocean-Happy-42!'" },
              { title: "Use unique passwords", description: "Never reuse passwords across sites. If one site is breached, other accounts stay safe." },
              { title: "Enable 2FA everywhere", description: "Use authenticator apps (Google Authenticator, Authy) instead of SMS for the best security." },
              { title: "Use a password manager", description: "Let software generate and store complex unique passwords for every account." },
              { title: "Check for breaches", description: "Visit haveibeenpwned.com to check if your email has been in any data breaches." }
            ]
          },
          comparison: {
            left: { title: "Weak Passwords ❌", points: ["password123", "12345678", "admin", "qwerty", "Your birthday", "Same password everywhere"] },
            right: { title: "Strong Passwords ✅", points: ["Sunset-Ocean-Happy-42!", "j8#Kp2!mNq@4xL", "MyDog$Loves2Run!", "Random 16+ characters", "Unique per account", "Stored in password manager"] }
          }
        },
        {
          heading: "Safe Browsing and Digital Hygiene",
          body: "**Digital hygiene** is like personal hygiene for your digital life — regular practices that keep you safe and healthy online.\n\nAlways check that websites use **HTTPS** (look for the padlock icon) before entering personal information. Keep your software and operating system **updated** — security patches fix known vulnerabilities. Be careful with **public WiFi** — anyone on the same network could potentially intercept your data.\n\nBe mindful of your **digital footprint** — everything you post, share, and like online can be permanent. Think before you share personal information, photos, or location data.",
          illustration: [
            { emoji: "🔒", label: "Use HTTPS" },
            { emoji: "🔄", label: "Update Software" },
            { emoji: "📶", label: "Secure WiFi" },
            { emoji: "🗑️", label: "Delete Unused Apps" },
            { emoji: "👁️", label: "Privacy Settings" },
            { emoji: "💾", label: "Backup Data" }
          ],
          tip: "Set up automatic updates on all your devices. Most cyber attacks exploit known vulnerabilities that patches have already fixed — but only if you install them!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Two-Factor ___ adds a second layer of security beyond passwords.", answer: "authentication" },
        { type: "true-false", question: "Using the same password for multiple accounts is a good practice.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "What does the padlock icon in a browser indicate?", answer: "The connection is encrypted (HTTPS)", choices: ["The site is safe", "The connection is encrypted (HTTPS)", "The site is verified", "The site is popular"] },
        { type: "practice", question: "Create a cybersecurity awareness poster or presentation covering the top 5 threats students face online and practical steps to stay safe.", answer: "" },
      ]
    },
    {
      pageTitle: "Network Security & Encryption",
      subtitle: "How data is protected in transit and at rest",
      bannerColor: "from-orange-500 to-yellow-500",
      sections: [
        {
          heading: "Understanding Encryption",
          image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop",
          body: "**Encryption** converts readable data (plaintext) into an unreadable format (ciphertext) using a mathematical algorithm and a key. Only someone with the correct key can decrypt and read the data.\n\nThere are two main types: **Symmetric encryption** uses the same key for encryption and decryption (like a shared padlock key). **Asymmetric encryption** uses a pair of keys — a public key (for encrypting) and a private key (for decrypting). This is what secures your online banking, emails, and messages.\n\nModern encryption like **AES-256** is so strong that it would take billions of years for the world's fastest computers to crack it by brute force.",
          comparison: {
            left: { title: "Symmetric Encryption", points: ["Same key encrypts and decrypts", "Faster performance", "Challenge: sharing the key securely", "Example: AES (Advanced Encryption Standard)"] },
            right: { title: "Asymmetric Encryption", points: ["Public key encrypts, private key decrypts", "Slower but more secure for sharing", "No need to share private key", "Example: RSA, used in HTTPS/SSL"] }
          },
          funFact: "The Caesar cipher, one of the earliest encryption methods, was used by Julius Caesar 2000 years ago. He shifted each letter by 3 positions — A became D, B became E. Modern encryption is billions of times more complex!"
        },
        {
          heading: "Network Security Basics",
          body: "**Network security** protects data as it travels between devices across the internet. Every time you visit a website, send a message, or stream a video, data passes through multiple networks — each one is a potential interception point.\n\n**Firewalls** act as gatekeepers, monitoring and controlling incoming and outgoing network traffic based on security rules. **VPNs** (Virtual Private Networks) create encrypted tunnels for your data, hiding your activity from eavesdroppers.\n\n**WiFi security** is crucial — always use WPA3 or WPA2 encryption for your home network, change default router passwords, and be cautious on public networks.",
          keyTerms: [
            { term: "Firewall", definition: "Software/hardware that monitors and filters network traffic" },
            { term: "VPN", definition: "Virtual Private Network — encrypts internet connection for privacy" },
            { term: "HTTPS", definition: "Secure HTTP — encrypts web traffic using SSL/TLS" },
            { term: "WPA3", definition: "Latest WiFi security protocol for encrypted wireless connections" },
            { term: "SSL/TLS", definition: "Protocols that secure internet communications" }
          ]
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ acts as a gatekeeper, monitoring network traffic.", answer: "firewall" },
        { type: "true-false", question: "Asymmetric encryption uses the same key for encryption and decryption.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "What does VPN stand for?", answer: "Virtual Private Network", choices: ["Very Private Network", "Virtual Private Network", "Virtual Public Network", "Verified Private Network"] },
        { type: "practice", question: "Research and present on how HTTPS works — from the user typing a URL to the encrypted data being exchanged. Include diagrams showing the handshake process.", answer: "" },
      ]
    },
    {
      pageTitle: "Ethics & Digital Citizenship",
      subtitle: "Responsible behavior in the digital world",
      bannerColor: "from-yellow-500 to-amber-500",
      sections: [
        {
          heading: "Digital Ethics and Responsible Computing",
          body: "**Digital ethics** involves making responsible choices about how we use technology. Just because something is technically possible doesn't mean it's right. Hacking into someone's account, spreading false information, cyberbullying, and pirating software are all unethical and often illegal.\n\n**Cyberbullying** — using technology to harass, threaten, or embarrass someone — is a serious issue. It can cause real psychological harm. If you or someone you know is being cyberbullied, tell a trusted adult and report the behavior to the platform.\n\n**Intellectual property** — respecting others' creative work by not pirating software, music, or movies, and properly crediting sources in your work. Open-source software provides legal, free alternatives.",
          illustration: [
            { emoji: "⚖️", label: "Ethics" },
            { emoji: "🤝", label: "Respect" },
            { emoji: "📜", label: "Copyright" },
            { emoji: "🚫", label: "No Bullying" },
            { emoji: "✅", label: "Consent" },
            { emoji: "🌍", label: "Digital Citizen" }
          ],
          warningNote: "Unauthorized access to computer systems is a criminal offense under the IT Act 2000 in India, carrying penalties of imprisonment up to 3 years and fines. Even 'just looking around' without permission is illegal."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Using technology to harass or embarrass someone is called ___.", answer: "cyberbullying" },
        { type: "true-false", question: "Pirating software is both unethical and illegal.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a 'Digital Citizenship Pledge' with 10 commitments for responsible online behavior. Present it to your class and discuss each point.", answer: "" },
      ]
    }
  ]
};

// ======================== CLASS 9: DATA SCIENCE ========================
const c9DataSci: TopicTextbook = {
  topicId: "c9-data-sci",
  topicTitle: "Introduction to Data Science",
  subjectColor: "neon-pink",
  pages: [
    {
      pageTitle: "What is Data Science?",
      subtitle: "Discovering insights from data",
      bannerColor: "from-pink-500 to-rose-500",
      sections: [
        {
          heading: "The World of Data Science",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
          body: "**Data Science** combines statistics, programming, and domain knowledge to extract meaningful insights from data. It's one of the fastest-growing fields in technology, transforming industries from healthcare to entertainment.\n\nData scientists don't just crunch numbers — they ask questions, find patterns, make predictions, and help organizations make better decisions. Netflix uses data science to recommend shows, doctors use it to predict diseases, and cities use it to optimize traffic flow.\n\nThe amount of data in the world doubles every two years. Being able to understand and work with data is becoming as essential as reading and writing.",
          illustration: [
            { emoji: "📊", label: "Statistics" },
            { emoji: "💻", label: "Programming" },
            { emoji: "🧠", label: "Domain Knowledge" },
            { emoji: "🔍", label: "Analysis" },
            { emoji: "📈", label: "Visualization" },
            { emoji: "🤖", label: "Machine Learning" }
          ],
          youtubeId: "ua-CiDNNj30",
          keyTerms: [
            { term: "Data Science", definition: "The field of extracting insights from data using statistics and programming" },
            { term: "Dataset", definition: "A collection of data, usually organized in rows and columns" },
            { term: "Variable", definition: "A measurable characteristic (height, grade, temperature)" },
            { term: "Correlation", definition: "A statistical relationship between two variables" },
            { term: "Outlier", definition: "A data point significantly different from others" }
          ]
        },
        {
          heading: "The Data Science Process",
          body: "Data science follows a systematic process. Each step is crucial — skipping steps leads to incorrect conclusions and wasted effort.\n\nThe process starts with a **question** — what are we trying to find out? Then we collect and clean data, analyze it, create visualizations, and communicate findings. In practice, these steps are often iterative — new insights may lead you back to collect more data or refine your question.\n\nData cleaning typically takes 60-80% of a data scientist's time! Real-world data is messy — missing values, typos, inconsistent formats, and duplicates must all be handled before analysis.",
          stepByStep: {
            steps: [
              { title: "Ask a Question", description: "Define what you want to learn. 'Which factors affect student performance the most?'" },
              { title: "Collect Data", description: "Gather data from surveys, databases, APIs, sensors, or public datasets." },
              { title: "Clean the Data", description: "Handle missing values, fix errors, remove duplicates, standardize formats." },
              { title: "Explore and Analyze", description: "Calculate statistics, find patterns, test hypotheses, look for correlations." },
              { title: "Visualize", description: "Create charts, graphs, and dashboards that reveal insights clearly." },
              { title: "Communicate Findings", description: "Present results in a clear, actionable way. Tell a story with your data." }
            ]
          },
          funFact: "Every day, the world generates 2.5 quintillion bytes of data — that's 2.5 followed by 18 zeros! 90% of all data ever created was generated in the last two years."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Data ___ typically takes 60-80% of a data scientist's time.", answer: "cleaning" },
        { type: "true-false", question: "Data visualization helps communicate findings clearly.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which step comes first in the data science process?", answer: "Ask a question", choices: ["Collect data", "Ask a question", "Create visualizations", "Clean data"] },
      ]
    },
    {
      pageTitle: "Python for Data Science",
      subtitle: "Essential libraries and techniques",
      bannerColor: "from-rose-500 to-red-500",
      sections: [
        {
          heading: "Pandas — Data Manipulation",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
          body: "**Pandas** is Python's most popular library for data analysis. It provides **DataFrames** — powerful table-like structures that make working with data intuitive and efficient.\n\nWith Pandas, you can load data from CSV files, Excel spreadsheets, and databases. Then filter rows, select columns, calculate statistics, group data, merge tables, and much more — all with concise, readable code.\n\nPandas handles millions of rows efficiently and integrates seamlessly with other data science libraries.",
          codeBlock: {
            language: "python",
            code: "import pandas as pd\n\n# Load data from CSV\ndf = pd.read_csv('students.csv')\n\n# View first 5 rows\nprint(df.head())\n\n# Basic statistics\nprint(df.describe())  # mean, std, min, max for all numeric columns\n\n# Filter data\ntop_students = df[df['marks'] > 90]\nclass_9 = df[df['class'] == 9]\n\n# Group by and aggregate\navg_by_class = df.groupby('class')['marks'].mean()\nprint(avg_by_class)\n\n# Add calculated column\ndf['percentage'] = (df['marks'] / df['total']) * 100\n\n# Sort values\ndf_sorted = df.sort_values('marks', ascending=False)\n\n# Handle missing values\ndf['marks'].fillna(df['marks'].mean(), inplace=True)"
          },
          tip: "Use `df.info()` to see column types and missing values, and `df.describe()` to get quick statistics for all numeric columns."
        },
        {
          heading: "Data Visualization with Matplotlib",
          body: "**Matplotlib** is Python's foundational visualization library. It creates static, publication-quality charts including line plots, bar charts, scatter plots, histograms, pie charts, and more.\n\nGood visualizations reveal patterns that numbers alone can't show. A well-chosen chart can make the difference between understanding your data and missing important insights.\n\nFor more modern-looking charts, **Seaborn** builds on Matplotlib with a high-level interface and beautiful default styles, especially for statistical visualizations.",
          codeBlock: {
            language: "python",
            code: "import matplotlib.pyplot as plt\nimport numpy as np\n\n# Sample data\nsubjects = ['Maths', 'Science', 'English', 'Hindi', 'Computer']\nmarks = [95, 88, 76, 82, 98]\n\n# Bar chart\nplt.figure(figsize=(10, 6))\nplt.bar(subjects, marks, color=['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'])\nplt.title('Student Marks by Subject', fontsize=16)\nplt.ylabel('Marks')\nplt.ylim(0, 100)\nplt.savefig('marks_chart.png')\nplt.show()\n\n# Line chart with multiple lines\nmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May']\nstudent1 = [78, 82, 85, 88, 92]\nstudent2 = [85, 83, 87, 90, 95]\nplt.plot(months, student1, marker='o', label='Aarav')\nplt.plot(months, student2, marker='s', label='Priya')\nplt.legend()\nplt.title('Monthly Progress')\nplt.show()"
          },
          illustration: [
            { emoji: "📊", label: "Bar Chart" },
            { emoji: "📈", label: "Line Chart" },
            { emoji: "🔵", label: "Scatter Plot" },
            { emoji: "🥧", label: "Pie Chart" },
            { emoji: "📉", label: "Histogram" },
            { emoji: "🗺️", label: "Heatmap" }
          ]
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The Python library ___ is used for data manipulation and analysis.", answer: "pandas" },
        { type: "true-false", question: "A DataFrame is a table-like structure provided by Pandas.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which function shows the first 5 rows of a DataFrame?", answer: "df.head()", choices: ["df.show()", "df.head()", "df.first()", "df.top()"] },
        { type: "practice", question: "Collect height and weight data from 20 classmates. Load it into a Pandas DataFrame, calculate BMI, create a scatter plot, and identify any correlations.", answer: "" },
      ]
    },
    {
      pageTitle: "Statistics for Data Science",
      subtitle: "Understanding data through numbers",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Descriptive Statistics",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
          body: "**Descriptive statistics** summarize and describe data using numbers. They answer: What does our data look like?\n\n**Measures of central tendency** tell you where the 'middle' of your data is: **Mean** (average), **Median** (middle value when sorted), and **Mode** (most frequent value). Each has strengths — mean is affected by outliers, while median is more robust.\n\n**Measures of spread** tell you how spread out the data is: **Range** (max - min), **Variance** (average squared deviation from mean), and **Standard Deviation** (square root of variance — most commonly used because it's in the same units as the data).",
          table: {
            headers: ["Measure", "Formula", "Best For", "Example"],
            rows: [
              ["Mean", "Sum ÷ Count", "Normally distributed data", "Average test score: 82"],
              ["Median", "Middle value when sorted", "Skewed data, with outliers", "Median salary: ₹5 lakhs"],
              ["Mode", "Most frequent value", "Categorical data", "Most popular subject: Science"],
              ["Range", "Max - Min", "Quick spread overview", "Score range: 45-98 = 53"],
              ["Std Dev", "√(Variance)", "Typical deviation from mean", "σ = 12 means scores vary by ~12"]
            ]
          },
          codeBlock: {
            language: "python",
            code: "import numpy as np\nimport pandas as pd\n\nmarks = [95, 88, 76, 82, 98, 65, 90, 73, 85, 92]\n\n# Measures of central tendency\nprint(f'Mean: {np.mean(marks):.1f}')      # 84.4\nprint(f'Median: {np.median(marks):.1f}')  # 86.5\nfrom statistics import mode\nprint(f'Mode: {mode(marks)}')              # Most frequent\n\n# Measures of spread\nprint(f'Range: {max(marks) - min(marks)}')  # 33\nprint(f'Std Dev: {np.std(marks):.1f}')      # ~10.0\nprint(f'Variance: {np.var(marks):.1f}')     # ~100.0\n\n# Using Pandas\ndf = pd.DataFrame({'marks': marks})\nprint(df.describe())  # All stats at once"
          }
        },
        {
          heading: "Data Interpretation and Correlation",
          body: "**Correlation** measures the relationship between two variables. A **positive correlation** means both increase together (study hours and grades). A **negative correlation** means one increases as the other decreases (screen time and grades).\n\nThe **correlation coefficient** ranges from -1 to +1. Values close to +1 or -1 indicate strong relationships, while values near 0 indicate weak or no relationship.\n\n**Important:** Correlation does NOT mean causation! Just because two things are correlated doesn't mean one causes the other. Ice cream sales and drowning incidents are correlated — but ice cream doesn't cause drowning; summer heat causes both.",
          warningNote: "Correlation ≠ Causation! Finding a statistical relationship between two variables does NOT prove that one causes the other. Always consider other factors and confounding variables."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ is the middle value when data is sorted in order.", answer: "median" },
        { type: "true-false", question: "Correlation always implies that one variable causes another.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which measure is most affected by extreme outliers?", answer: "Mean", choices: ["Mean", "Median", "Mode", "Range"] },
        { type: "practice", question: "Collect data about your class (study hours and test scores). Calculate mean, median, standard deviation for both, find the correlation, and present your analysis with appropriate charts.", answer: "" },
      ]
    },
    {
      pageTitle: "Real-World Data Science Applications",
      subtitle: "How data science transforms industries",
      bannerColor: "from-pink-500 to-fuchsia-500",
      sections: [
        {
          heading: "Data Science in Action",
          body: "Data science is reshaping virtually every industry. **Healthcare** uses data science for disease prediction, drug discovery, and personalized treatment plans. **Education** uses it to identify struggling students early and personalize learning paths.\n\n**Business** uses data science for customer behavior analysis, demand forecasting, and recommendation systems. **Sports** teams use data analytics to optimize player performance, strategy, and recruitment. **Government** uses data for traffic management, crime prediction, and resource allocation.\n\nAs a student, understanding data science opens doors to exciting careers. Data scientists are among the highest-paid professionals, and demand continues to grow rapidly.",
          table: {
            headers: ["Industry", "Application", "Impact"],
            rows: [
              ["🏥 Healthcare", "Disease prediction, drug discovery", "Earlier diagnosis, personalized treatment"],
              ["🎬 Entertainment", "Recommendation systems", "Netflix saves $1B/year with recommendations"],
              ["🏦 Finance", "Fraud detection", "Real-time identification of suspicious transactions"],
              ["🌾 Agriculture", "Crop yield prediction", "Optimized farming, reduced waste"],
              ["🚗 Transport", "Route optimization", "Reduced delivery times and fuel costs"],
              ["📚 Education", "Adaptive learning", "Personalized education for every student"]
            ]
          },
          funFact: "Netflix's recommendation system is worth about $1 billion per year! Their data science team analyzes viewing patterns, ratings, and behavior to suggest content you'll love."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Netflix uses ___ systems to suggest content users might enjoy.", answer: "recommendation" },
        { type: "true-false", question: "Data science is only used in technology companies.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Choose an industry (healthcare, sports, education, or environment). Research how data science is used in that field and create a presentation with real examples and case studies.", answer: "" },
      ]
    }
  ]
};

// ======================== CLASS 10: PYTHON PROJECTS ========================
const c10PythonProjects: TopicTextbook = {
  topicId: "c10-py-projects",
  topicTitle: "Advanced Programming Projects",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Project Planning and Structure",
      subtitle: "How professional developers plan and organize code",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "The Software Development Lifecycle",
          body: "Building real software isn't just about writing code — it's a structured process that professional teams follow. The **Software Development Lifecycle (SDLC)** ensures projects are completed on time, on budget, and with high quality.\n\nThe cycle starts with **planning** (what problem are we solving?), moves through **design** (how will we solve it?), **development** (writing the code), **testing** (finding and fixing bugs), **deployment** (releasing to users), and **maintenance** (ongoing improvements).\n\nAs a student, following even a simplified version of this process will make your projects significantly better. Start every project with a plan — what features do you need, how will data flow, and what does the final product look like?",
          stepByStep: {
            steps: [
              { title: "Define the Problem", description: "Clearly state what your project does and who it's for. Write a one-paragraph description." },
              { title: "Plan Features", description: "List all features as user stories: 'As a user, I want to... so that I can...'" },
              { title: "Design the Architecture", description: "Sketch how data flows. Decide on data structures, file organization, and modules." },
              { title: "Build the MVP", description: "Start with the minimum viable product — the simplest version that works." },
              { title: "Test and Iterate", description: "Test each feature, fix bugs, get feedback, and improve." },
              { title: "Document and Present", description: "Write a README, add code comments, and prepare a demo." }
            ]
          },
          youtubeId: "8ext9G7xspg"
        },
        {
          heading: "Project Organization",
          body: "Well-organized code is easier to understand, debug, and extend. Professional Python projects follow standard conventions for file and folder structure.\n\nThe **main entry point** (main.py) should be simple — it imports modules and calls functions. **Modules** group related functions together (all database operations in one file, all UI functions in another). **Configuration** is kept separate from code.\n\nGood organization also means proper use of **virtual environments** (to manage dependencies), **requirements.txt** (listing required packages), and a **README.md** (explaining what the project does and how to run it).",
          codeBlock: {
            language: "python",
            code: "# Project structure example\n# my_project/\n# ├── main.py           # Entry point\n# ├── config.py         # Settings and constants\n# ├── models/\n# │   ├── student.py    # Student class\n# │   └── course.py     # Course class\n# ├── utils/\n# │   ├── database.py   # Database operations\n# │   ├── validators.py # Input validation\n# │   └── helpers.py    # Utility functions\n# ├── tests/\n# │   ├── test_student.py\n# │   └── test_database.py\n# ├── data/\n# │   └── students.csv\n# ├── requirements.txt  # Dependencies\n# └── README.md         # Documentation\n\n# main.py — simple and clean\nfrom models.student import Student\nfrom utils.database import Database\n\ndef main():\n    db = Database('school.db')\n    students = db.get_all_students()\n    for s in students:\n        print(s.display())\n\nif __name__ == '__main__':\n    main()"
          },
          tip: "Start with a simple version of your project (MVP), then add features one by one. Don't try to build everything at once!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "MVP stands for Minimum ___ Product.", answer: "viable" },
        { type: "true-false", question: "Breaking code into small functions makes it easier to debug.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which file typically lists project dependencies?", answer: "requirements.txt", choices: ["main.py", "config.py", "requirements.txt", "setup.py"] },
      ]
    },
    {
      pageTitle: "Project 1: Quiz Game Application",
      subtitle: "Build an interactive quiz with scoring and categories",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "Building a Quiz Game",
          body: "This project puts your Python skills to work by building a fully-featured **quiz game application**. The game loads questions from a file, presents them to the user with multiple-choice options, tracks scores, provides instant feedback, and saves high scores.\n\nThis project practices **file handling** (loading questions from JSON), **OOP** (Question and Quiz classes), **user input validation** (handling bad input gracefully), and **data persistence** (saving high scores to a file).\n\nStart simple with a few hard-coded questions, then extend to load from files, add categories, implement a timer, and create a leaderboard.",
          codeBlock: {
            language: "python",
            code: "import json\nimport random\nimport time\n\nclass Question:\n    def __init__(self, text, options, correct_answer, category):\n        self.text = text\n        self.options = options\n        self.correct_answer = correct_answer\n        self.category = category\n    \n    def display(self):\n        print(f'\\n{self.text}')\n        for i, option in enumerate(self.options, 1):\n            print(f'  {i}. {option}')\n    \n    def check_answer(self, user_answer):\n        return self.options[user_answer - 1] == self.correct_answer\n\nclass Quiz:\n    def __init__(self, questions):\n        self.questions = questions\n        self.score = 0\n        self.total = len(questions)\n    \n    def run(self):\n        random.shuffle(self.questions)\n        for i, q in enumerate(self.questions, 1):\n            print(f'\\n--- Question {i}/{self.total} ---')\n            q.display()\n            try:\n                answer = int(input('Your answer (1-4): '))\n                if q.check_answer(answer):\n                    print('✅ Correct!')\n                    self.score += 1\n                else:\n                    print(f'❌ Wrong! Answer: {q.correct_answer}')\n            except (ValueError, IndexError):\n                print('Invalid input! Skipping...')\n        \n        print(f'\\n🏆 Final Score: {self.score}/{self.total}')\n        return self.score"
          },
          illustration: [
            { emoji: "❓", label: "Questions" },
            { emoji: "🎯", label: "Scoring" },
            { emoji: "⏱️", label: "Timer" },
            { emoji: "🏆", label: "Leaderboard" },
            { emoji: "📂", label: "Categories" },
            { emoji: "💾", label: "Save Progress" }
          ]
        }
      ],
      exercises: [
        { type: "practice", question: "Build the complete quiz game: (1) Load questions from a JSON file (2) Add at least 3 categories with 5+ questions each (3) Track high scores (4) Add a timer for each question (5) Save leaderboard to a file.", answer: "" },
      ]
    },
    {
      pageTitle: "Project 2: Student Management System",
      subtitle: "A complete CRUD application with file storage",
      bannerColor: "from-teal-500 to-cyan-500",
      sections: [
        {
          heading: "Building a Student Management System",
          body: "A **Student Management System** is a practical project that demonstrates all core programming concepts: data storage, user input, search functionality, and file operations.\n\nThe system allows administrators to **Create** student records, **Read** (view and search) records, **Update** existing information, and **Delete** records — the fundamental CRUD operations used in every real application.\n\nThis project teaches you to think about **data modeling** (what information to store), **user interface design** (menu-driven CLI), **error handling** (invalid inputs), and **persistence** (saving data between sessions).",
          codeBlock: {
            language: "python",
            code: "import json\nfrom datetime import datetime\n\nclass Student:\n    def __init__(self, roll_no, name, grade, marks):\n        self.roll_no = roll_no\n        self.name = name\n        self.grade = grade\n        self.marks = marks\n        self.created_at = datetime.now().strftime('%Y-%m-%d')\n    \n    def to_dict(self):\n        return {\n            'roll_no': self.roll_no,\n            'name': self.name,\n            'grade': self.grade,\n            'marks': self.marks,\n            'created_at': self.created_at\n        }\n    \n    def display(self):\n        avg = sum(self.marks.values()) / len(self.marks)\n        print(f'Roll: {self.roll_no} | Name: {self.name} | '\n              f'Grade: {self.grade} | Average: {avg:.1f}')\n\nclass StudentManager:\n    def __init__(self, filename='students.json'):\n        self.filename = filename\n        self.students = self.load_data()\n    \n    def load_data(self):\n        try:\n            with open(self.filename, 'r') as f:\n                data = json.load(f)\n                return {d['roll_no']: Student(**d) for d in data}\n        except FileNotFoundError:\n            return {}\n    \n    def save_data(self):\n        with open(self.filename, 'w') as f:\n            json.dump([s.to_dict() for s in self.students.values()],\n                      f, indent=2)\n    \n    def add_student(self, student):\n        self.students[student.roll_no] = student\n        self.save_data()\n        print(f'✅ Added {student.name}')\n    \n    def search(self, query):\n        results = [s for s in self.students.values()\n                   if query.lower() in s.name.lower()]\n        for s in results:\n            s.display()\n        return results"
          },
          keyTerms: [
            { term: "CRUD", definition: "Create, Read, Update, Delete — the four basic data operations" },
            { term: "Data Model", definition: "The structure defining what data is stored and how" },
            { term: "Persistence", definition: "Saving data so it survives program restarts" },
            { term: "Serialization", definition: "Converting objects to a storable format (JSON, CSV)" }
          ]
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "CRUD stands for Create, Read, Update, and ___.", answer: "delete" },
        { type: "practice", question: "Build the complete Student Management System with: (1) Add/view/update/delete students (2) Search by name or roll number (3) Sort by marks or name (4) Generate class report with statistics (5) Export data to CSV.", answer: "" },
      ]
    },
    {
      pageTitle: "Project 3: Data Analysis Dashboard",
      subtitle: "Analyze real data and generate visual reports",
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "Building a Data Analysis Tool",
          body: "This project combines your Python, data analysis, and visualization skills to build a tool that loads real data, calculates statistics, generates charts, and produces a summary report.\n\nYou'll use **Pandas** for data manipulation, **Matplotlib** for visualizations, and file handling for report generation. This mirrors what data analysts do in real jobs — making sense of data and presenting it in a way that non-technical people can understand.\n\nChoose a dataset that interests you: weather data, sports statistics, school performance, or public health data. Many free datasets are available online.",
          codeBlock: {
            language: "python",
            code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndef analyze_class_performance(filename):\n    # Load data\n    df = pd.read_csv(filename)\n    \n    # Summary statistics\n    print('=== Class Performance Report ===')\n    print(f'Total Students: {len(df)}')\n    print(f'Average Marks: {df[\"marks\"].mean():.1f}')\n    print(f'Highest: {df[\"marks\"].max()} ({df.loc[df[\"marks\"].idxmax(), \"name\"]})')\n    print(f'Pass Rate: {(df[\"marks\"] >= 40).mean()*100:.1f}%')\n    \n    # Grade distribution chart\n    fig, axes = plt.subplots(1, 3, figsize=(15, 5))\n    \n    # Bar chart: Average by subject\n    subject_avg = df.groupby('subject')['marks'].mean()\n    subject_avg.plot(kind='bar', ax=axes[0], color='#667eea')\n    axes[0].set_title('Average Marks by Subject')\n    \n    # Histogram: Score distribution\n    df['marks'].hist(bins=10, ax=axes[1], color='#764ba2')\n    axes[1].set_title('Score Distribution')\n    \n    # Pie chart: Grade breakdown\n    grade_counts = df['grade'].value_counts()\n    grade_counts.plot(kind='pie', ax=axes[2], autopct='%1.1f%%')\n    axes[2].set_title('Grade Distribution')\n    \n    plt.tight_layout()\n    plt.savefig('class_report.png', dpi=150)\n    plt.show()\n    print('\\n📊 Report saved as class_report.png')"
          },
          illustration: [
            { emoji: "📁", label: "Load Data" },
            { emoji: "🧹", label: "Clean" },
            { emoji: "🔢", label: "Calculate" },
            { emoji: "📊", label: "Visualize" },
            { emoji: "📝", label: "Report" },
            { emoji: "📤", label: "Export" }
          ]
        }
      ],
      exercises: [
        { type: "practice", question: "Build a complete data analysis dashboard: (1) Load a CSV dataset (2) Clean and preprocess data (3) Calculate at least 5 statistics (4) Generate 3 different chart types (5) Produce a summary text report (6) Export all results to files.", answer: "" },
      ]
    },
    {
      pageTitle: "Version Control with Git",
      subtitle: "Tracking changes and collaborating like professionals",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Introduction to Git",
          body: "**Git** is the world's most popular version control system. It tracks every change you make to your code, letting you go back to any previous version, experiment safely on branches, and collaborate with others without conflicts.\n\nEvery professional developer uses Git. It's not just about backing up code — it's about maintaining a complete history of your project, enabling teamwork, and providing a safety net for experimentation.\n\n**GitHub** is a platform that hosts Git repositories online, adding features like pull requests, issue tracking, and project management. Your GitHub profile serves as a portfolio showing your projects and contributions.",
          codeBlock: {
            language: "python",
            code: "# Git commands (run in terminal, not Python)\n\n# Initialize a new repository\n# git init\n\n# Check status of files\n# git status\n\n# Stage files for commit\n# git add main.py        # Add specific file\n# git add .              # Add all changes\n\n# Commit with message\n# git commit -m \"Add student management feature\"\n\n# View history\n# git log --oneline\n\n# Create and switch branches\n# git branch new-feature\n# git checkout new-feature\n# (or: git checkout -b new-feature)\n\n# Merge branch back to main\n# git checkout main\n# git merge new-feature\n\n# Connect to GitHub\n# git remote add origin https://github.com/user/repo.git\n# git push -u origin main"
          },
          stepByStep: {
            steps: [
              { title: "Install Git", description: "Download from git-scm.com and install. Verify with 'git --version' in terminal." },
              { title: "Configure your identity", description: "Set your name and email: git config --global user.name 'Your Name'" },
              { title: "Initialize a repository", description: "Navigate to your project folder and run 'git init' to start tracking." },
              { title: "Make commits regularly", description: "Stage changes with 'git add' and commit with 'git commit -m \"description\"'" },
              { title: "Push to GitHub", description: "Create a repository on GitHub and push your code to share it with the world." }
            ]
          },
          funFact: "Git was created by Linus Torvalds (creator of Linux) in just 10 days in 2005! He built it because the existing version control tools were too slow for the Linux kernel project."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Git ___ creates a snapshot of your current changes with a message.", answer: "commit" },
        { type: "true-false", question: "GitHub and Git are the same thing.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which command shows the status of changed files?", answer: "git status", choices: ["git log", "git status", "git show", "git diff"] },
        { type: "practice", question: "Create a GitHub account and repository. Initialize Git in one of your projects, make at least 5 meaningful commits, create a branch for a new feature, merge it back, and push everything to GitHub.", answer: "" },
      ]
    }
  ]
};

// ======================== CLASS 10: WEB APPS ========================
const c10WebApps: TopicTextbook = {
  topicId: "c10-web-apps",
  topicTitle: "Web Applications",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Web Application Architecture",
      subtitle: "Understanding how web apps work behind the scenes",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "How Web Applications Work",
          body: "A **web application** is more than a static website — it's a dynamic system that responds to user actions, stores data, and provides personalized experiences. Every app you use daily — Gmail, YouTube, Instagram — is a web application.\n\nWeb apps follow a **client-server architecture**: the **client** (your browser) sends requests, the **server** processes them, and sends back responses. This communication happens through **HTTP** (HyperText Transfer Protocol) and its secure version **HTTPS**.\n\nModern web apps are increasingly built as **Single Page Applications (SPAs)** using frameworks like React, Vue, or Angular. Instead of loading new pages from the server, SPAs update content dynamically on the client side, creating faster, app-like experiences.",
          illustration: [
            { emoji: "🖥️", label: "Frontend" },
            { emoji: "⚙️", label: "Backend" },
            { emoji: "🗄️", label: "Database" },
            { emoji: "🔌", label: "API" },
            { emoji: "☁️", label: "Cloud" },
            { emoji: "🔒", label: "Security" }
          ],
          youtubeId: "W6NZfCO5SIk",
          keyTerms: [
            { term: "Client-Server", definition: "Architecture where clients request data and servers provide responses" },
            { term: "HTTP/HTTPS", definition: "Protocols for communication between browsers and servers" },
            { term: "API", definition: "Application Programming Interface — a set of rules for software communication" },
            { term: "SPA", definition: "Single Page Application — updates content without full page reloads" },
            { term: "REST API", definition: "Architectural style for designing web APIs using HTTP methods" }
          ]
        },
        {
          heading: "Frontend vs Backend",
          body: "A web app has two sides: the **frontend** (what users see and interact with) and the **backend** (the server-side logic, database, and processing that users don't see).\n\nThe **frontend** is built with HTML, CSS, and JavaScript. Modern frontend development uses frameworks like **React** (created by Facebook), **Vue.js**, and **Angular** (created by Google) that make building complex user interfaces manageable.\n\nThe **backend** handles business logic, data storage, authentication, and communication with external services. Popular backend technologies include **Node.js** (JavaScript), **Python** (Django/Flask), **Java** (Spring), and **Go**.",
          comparison: {
            left: { title: "Frontend", points: ["What users see and interact with", "HTML, CSS, JavaScript", "Frameworks: React, Vue, Angular", "Runs in the user's browser", "Handles UI, animations, user input"] },
            right: { title: "Backend", points: ["Server-side processing", "Node.js, Python, Java, Go", "Frameworks: Express, Django, Spring", "Runs on a server", "Handles data, auth, business logic"] }
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "An ___ connects the frontend to the backend of a web application.", answer: "API" },
        { type: "true-false", question: "The backend is what users directly see and interact with.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which is a frontend JavaScript framework?", answer: "React", choices: ["Django", "React", "Express", "Flask"] },
      ]
    },
    {
      pageTitle: "APIs and Data Exchange",
      subtitle: "How different parts of an app communicate",
      bannerColor: "from-indigo-500 to-violet-500",
      sections: [
        {
          heading: "Understanding REST APIs",
          body: "**APIs (Application Programming Interfaces)** define how different software components communicate. **REST APIs** are the most common type for web applications — they use standard HTTP methods to perform operations on data.\n\nThink of an API like a waiter in a restaurant: you (the client) give your order to the waiter (API), who takes it to the kitchen (server), and brings back your food (response). You don't need to know how the kitchen works — just how to place an order.\n\nREST APIs use four main HTTP methods that map to CRUD operations: **GET** (read), **POST** (create), **PUT/PATCH** (update), and **DELETE** (remove).",
          table: {
            headers: ["HTTP Method", "CRUD Operation", "Example URL", "Description"],
            rows: [
              ["GET", "Read", "/api/students", "Get all students"],
              ["GET", "Read", "/api/students/42", "Get student with ID 42"],
              ["POST", "Create", "/api/students", "Add a new student"],
              ["PUT", "Update", "/api/students/42", "Update student 42"],
              ["DELETE", "Delete", "/api/students/42", "Delete student 42"]
            ]
          },
          codeBlock: {
            language: "javascript",
            code: "// Fetching data from an API\nconst response = await fetch('https://api.example.com/students');\nconst students = await response.json();\nconsole.log(students);\n\n// Sending data to an API\nconst newStudent = {\n    name: 'Aarav Sharma',\n    grade: 'A',\n    class: 10\n};\n\nconst response = await fetch('https://api.example.com/students', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(newStudent)\n});\n\nconst result = await response.json();\nconsole.log('Created:', result);"
          }
        },
        {
          heading: "JSON — The Language of APIs",
          body: "**JSON (JavaScript Object Notation)** is the standard data format for web APIs. It's human-readable, lightweight, and supported by virtually every programming language.\n\nJSON uses key-value pairs (like Python dictionaries) and arrays (like Python lists). API responses are almost always in JSON format — understanding how to parse and create JSON is essential for web development.\n\nJSON supports strings, numbers, booleans, arrays, objects, and null values. It's strict about syntax — keys must be double-quoted, and trailing commas are not allowed.",
          codeBlock: {
            language: "javascript",
            code: "// JSON structure\n{\n    \"student\": {\n        \"name\": \"Aarav Sharma\",\n        \"age\": 16,\n        \"grade\": \"A\",\n        \"subjects\": [\"Maths\", \"Science\", \"Computer\"],\n        \"address\": {\n            \"city\": \"Delhi\",\n            \"state\": \"Delhi\"\n        },\n        \"active\": true\n    }\n}\n\n// Parsing JSON in JavaScript\nconst jsonString = '{\"name\": \"Aarav\", \"marks\": 95}';\nconst student = JSON.parse(jsonString);  // String → Object\nconsole.log(student.name);  // 'Aarav'\n\n// Converting to JSON\nconst data = { name: 'Priya', marks: 98 };\nconst json = JSON.stringify(data);  // Object → String"
          },
          tip: "Use browser developer tools (F12 → Network tab) to see API requests and responses in real-time. It's the best way to understand how web apps communicate!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "JSON stands for JavaScript Object ___.", answer: "notation" },
        { type: "true-false", question: "The GET method is used to create new data on a server.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which HTTP method is used to update existing data?", answer: "PUT", choices: ["GET", "POST", "PUT", "DELETE"] },
        { type: "practice", question: "Use a free public API (like JSONPlaceholder) to build a mini app that displays a list of posts, shows details when clicked, and allows adding new posts.", answer: "" },
      ]
    },
    {
      pageTitle: "Building a Web App with Flask",
      subtitle: "Creating your first Python web application",
      bannerColor: "from-violet-500 to-purple-500",
      sections: [
        {
          heading: "Introduction to Flask",
          body: "**Flask** is a lightweight Python web framework that makes building web applications simple. It's called a 'micro-framework' because it provides the essentials without unnecessary complexity — perfect for learning and small-to-medium projects.\n\nFlask handles **routing** (connecting URLs to functions), **templates** (generating HTML with dynamic data), **form handling**, and **API creation**. Despite its simplicity, Flask powers websites used by millions of people, including Pinterest and LinkedIn.\n\nWith Flask, you can go from zero to a working web app in under 20 lines of code!",
          codeBlock: {
            language: "python",
            code: "from flask import Flask, render_template, request, jsonify\n\napp = Flask(__name__)\n\n# Simple route\n@app.route('/')\ndef home():\n    return '<h1>Welcome to My App!</h1>'\n\n# Route with parameter\n@app.route('/student/<name>')\ndef student(name):\n    return f'<h1>Hello, {name}!</h1>'\n\n# Template rendering\n@app.route('/dashboard')\ndef dashboard():\n    students = [\n        {'name': 'Aarav', 'marks': 95},\n        {'name': 'Priya', 'marks': 98},\n    ]\n    return render_template('dashboard.html', students=students)\n\n# API endpoint\n@app.route('/api/students', methods=['GET'])\ndef get_students():\n    return jsonify(students)\n\n# Form handling\n@app.route('/add', methods=['POST'])\ndef add_student():\n    name = request.form['name']\n    marks = int(request.form['marks'])\n    # Save to database...\n    return f'Added {name}!'\n\nif __name__ == '__main__':\n    app.run(debug=True)"
          },
          keyTerms: [
            { term: "Framework", definition: "A collection of tools and libraries that provide structure for building apps" },
            { term: "Route", definition: "A URL pattern mapped to a Python function" },
            { term: "Template", definition: "An HTML file with placeholders for dynamic data" },
            { term: "Jinja2", definition: "Flask's template engine for generating dynamic HTML" }
          ],
          funFact: "Facebook started as a simple web application built in a college dorm room! Mark Zuckerberg built the first version in just two weeks."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Flask is a ___ Python web framework.", answer: "micro" },
        { type: "true-false", question: "Flask can handle both web pages and API endpoints.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Build a simple Flask web app for a class bulletin board: (1) Home page showing recent announcements (2) Form to add new announcements (3) API endpoint to get announcements as JSON.", answer: "" },
      ]
    },
    {
      pageTitle: "Deployment and Going Live",
      subtitle: "Publishing your web app for the world to use",
      bannerColor: "from-purple-500 to-fuchsia-500",
      sections: [
        {
          heading: "Deploying Your Web Application",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
          body: "**Deployment** is the process of making your web application accessible on the internet. During development, your app runs locally (only you can access it). Deployment puts it on a server that anyone with the URL can reach.\n\nModern deployment platforms make this incredibly easy — many offer free tiers for student projects. The key concepts are **hosting** (where your code runs), **domains** (your URL), **environment variables** (configuration like database passwords), and **continuous deployment** (automatic updates when you push code to GitHub).\n\nBefore deploying, always test your app thoroughly, set up proper error handling, secure sensitive data, and optimize performance.",
          stepByStep: {
            steps: [
              { title: "Prepare your app", description: "Add requirements.txt, set up environment variables, and test in production mode." },
              { title: "Choose a hosting platform", description: "Free options: Render, Vercel, Railway, PythonAnywhere. Paid: AWS, Heroku, DigitalOcean." },
              { title: "Connect to GitHub", description: "Most platforms deploy directly from your GitHub repository." },
              { title: "Configure environment", description: "Set environment variables (database URLs, API keys) — never hardcode secrets!" },
              { title: "Deploy and monitor", description: "Push to deploy, check logs for errors, and monitor performance." }
            ]
          },
          illustration: [
            { emoji: "💻", label: "Local Dev" },
            { emoji: "🧪", label: "Testing" },
            { emoji: "📦", label: "Build" },
            { emoji: "☁️", label: "Deploy" },
            { emoji: "🌍", label: "Live!" },
            { emoji: "📊", label: "Monitor" }
          ],
          warningNote: "NEVER commit passwords, API keys, or database credentials to GitHub! Use environment variables and .env files (add .env to .gitignore)."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ variables store sensitive configuration like API keys securely.", answer: "environment" },
        { type: "true-false", question: "It's safe to commit API keys to a public GitHub repository.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Design a web application for your school — sketch 5 pages, list features, identify data to store, plan the API endpoints, and create a deployment checklist.", answer: "" },
      ]
    }
  ]
};

// ======================== CLASS 10: AI FUNDAMENTALS ========================
const c10AiFund: TopicTextbook = {
  topicId: "c10-ai-fund",
  topicTitle: "Artificial Intelligence Fundamentals",
  subjectColor: "neon-pink",
  pages: [
    {
      pageTitle: "Understanding Artificial Intelligence",
      subtitle: "What AI is and how it works",
      bannerColor: "from-pink-500 to-purple-500",
      sections: [
        {
          heading: "What is Artificial Intelligence?",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
          body: "**Artificial Intelligence (AI)** is the ability of machines to perform tasks that normally require human intelligence — understanding language, recognizing images, making decisions, and learning from experience.\n\nAI isn't one single technology — it's an umbrella term covering many approaches. **Machine Learning** teaches computers to learn from data. **Deep Learning** uses neural networks inspired by the brain. **Natural Language Processing** enables machines to understand and generate human language.\n\nAI is already part of your daily life: voice assistants (Alexa, Siri), auto-correct on your phone, face unlock, Netflix recommendations, spam filters, and Google search results are all powered by AI.",
          illustration: [
            { emoji: "🤖", label: "AI" },
            { emoji: "📊", label: "Machine Learning" },
            { emoji: "🧠", label: "Deep Learning" },
            { emoji: "🗣️", label: "NLP" },
            { emoji: "👁️", label: "Computer Vision" },
            { emoji: "🎮", label: "Reinforcement" }
          ],
          youtubeId: "JMUxmLyrhSk",
          keyTerms: [
            { term: "Artificial Intelligence", definition: "Machines performing tasks requiring human intelligence" },
            { term: "Machine Learning", definition: "AI that learns from data without explicit programming" },
            { term: "Deep Learning", definition: "ML using neural networks with many layers" },
            { term: "Neural Network", definition: "Computing system inspired by the human brain's structure" },
            { term: "Training Data", definition: "The data used to teach an ML model" },
            { term: "Algorithm", definition: "A step-by-step procedure for solving a problem" }
          ]
        },
        {
          heading: "The History and Evolution of AI",
          body: "AI has a fascinating history stretching back to the 1950s. **Alan Turing** proposed the famous Turing Test in 1950 — can a machine fool a human into thinking it's human? The term 'Artificial Intelligence' was coined in 1956 at a conference at Dartmouth College.\n\nAI went through periods of excitement ('AI summers') and disappointment ('AI winters') as early systems couldn't live up to grand promises. The breakthrough came with **big data** and **powerful computers** in the 2010s, enabling deep learning to achieve superhuman performance in image recognition, game playing, and language understanding.\n\nToday we're in an AI revolution — ChatGPT, DALL-E, self-driving cars, and AlphaFold (solving protein structures) represent capabilities that seemed impossible just a decade ago.",
          table: {
            headers: ["Year", "Milestone", "Significance"],
            rows: [
              ["1950", "Turing Test proposed", "First formal test for machine intelligence"],
              ["1956", "'AI' term coined", "Birth of AI as a field"],
              ["1997", "Deep Blue beats chess champion", "First AI to beat a world chess champion"],
              ["2011", "Watson wins Jeopardy!", "AI understands natural language questions"],
              ["2016", "AlphaGo beats Go champion", "AI masters complex strategy game"],
              ["2022", "ChatGPT released", "AI generates human-quality text conversations"],
              ["2024", "AI agents and multimodal AI", "AI that sees, hears, and acts autonomously"]
            ]
          },
          funFact: "Google's AI AlphaFold solved the protein folding problem in 2020 — predicting the 3D structures of nearly all known proteins. This problem had been unsolved for 50 years and could revolutionize medicine!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ Test asks whether a machine can fool a human into thinking it's human.", answer: "Turing" },
        { type: "true-false", question: "Deep learning uses neural networks inspired by the human brain.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which AI milestone happened in 1997?", answer: "Deep Blue beats chess champion", choices: ["ChatGPT released", "Deep Blue beats chess champion", "AlphaGo beats Go champion", "AI term coined"] },
      ]
    },
    {
      pageTitle: "Types of Machine Learning",
      subtitle: "How machines learn from data",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "Supervised Learning",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
          body: "**Supervised learning** is the most common type of ML. The model learns from **labeled data** — examples where we already know the correct answer. It's like learning from a textbook with an answer key.\n\nFor example, to build a spam filter, you show the model thousands of emails labeled as 'spam' or 'not spam'. The model learns patterns (certain words, sender addresses) and can then classify new emails it hasn't seen before.\n\nSupervised learning is used for **classification** (predicting categories: spam/not spam, cat/dog) and **regression** (predicting numbers: house prices, temperature tomorrow).",
          comparison: {
            left: { title: "Classification", points: ["Predicts categories/labels", "Email: spam or not spam?", "Image: cat, dog, or bird?", "Medical: disease or healthy?", "Output: discrete classes"] },
            right: { title: "Regression", points: ["Predicts continuous numbers", "House price based on features", "Tomorrow's temperature", "Student's expected marks", "Output: numerical value"] }
          },
          codeBlock: {
            language: "python",
            code: "# Simple supervised learning example\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# Training data: study hours → marks\nhours = np.array([1, 2, 3, 4, 5, 6, 7, 8]).reshape(-1, 1)\nmarks = np.array([35, 45, 55, 60, 72, 78, 85, 92])\n\n# Train the model\nmodel = LinearRegression()\nmodel.fit(hours, marks)\n\n# Predict marks for 5.5 hours of study\npredicted = model.predict([[5.5]])\nprint(f'Predicted marks for 5.5 hours: {predicted[0]:.1f}')\n\n# Model accuracy\nprint(f'R² Score: {model.score(hours, marks):.3f}')"
          }
        },
        {
          heading: "Unsupervised and Reinforcement Learning",
          body: "**Unsupervised learning** finds patterns in data without labels — the algorithm discovers structure on its own. It's like sorting a pile of mixed items without knowing the categories in advance.\n\n**Clustering** groups similar items together (customer segments, related news articles). **Dimensionality reduction** simplifies complex data for visualization.\n\n**Reinforcement learning** teaches agents through trial and error — the agent takes actions in an environment and receives rewards or penalties. It's how AI learned to play video games, control robots, and beat human champions at chess and Go.",
          table: {
            headers: ["Type", "Data", "Goal", "Examples"],
            rows: [
              ["Supervised", "Labeled (answers provided)", "Predict known categories/values", "Spam filter, price prediction"],
              ["Unsupervised", "Unlabeled (no answers)", "Find hidden patterns/groups", "Customer segmentation, anomaly detection"],
              ["Reinforcement", "Actions → rewards/penalties", "Learn optimal behavior", "Game AI, robotics, self-driving"]
            ]
          },
          illustration: [
            { emoji: "📚", label: "Supervised" },
            { emoji: "🔍", label: "Unsupervised" },
            { emoji: "🎮", label: "Reinforcement" },
            { emoji: "🏷️", label: "Labels" },
            { emoji: "🎯", label: "Patterns" },
            { emoji: "🏆", label: "Rewards" }
          ]
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ learning uses labeled data to train models.", answer: "supervised" },
        { type: "true-false", question: "Unsupervised learning requires labeled training data.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which learning type is used to train game-playing AI?", answer: "Reinforcement learning", choices: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Transfer learning"] },
        { type: "match", question: "Match each ML type to its example:", answer: "", matchPairs: [["Supervised", "Spam email filter"], ["Unsupervised", "Customer grouping"], ["Reinforcement", "Game-playing AI"], ["Classification", "Image recognition"]] },
      ]
    },
    {
      pageTitle: "AI Ethics and Bias",
      subtitle: "Responsible and fair artificial intelligence",
      bannerColor: "from-indigo-500 to-blue-500",
      sections: [
        {
          heading: "Bias in AI Systems",
          image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop",
          body: "AI systems learn from data — and if that data contains biases, the AI will learn and amplify those biases. This is a critical challenge because AI is increasingly used for important decisions in hiring, lending, healthcare, and criminal justice.\n\n**Data bias** occurs when training data doesn't represent the real world fairly. For example, if a hiring AI is trained on historical data where most hires were male, it might unfairly rank male candidates higher. If a facial recognition system is trained mostly on light-skinned faces, it performs poorly on darker skin tones.\n\n**Algorithmic bias** can also emerge from how models are designed and optimized. Even with balanced data, certain metrics or features can inadvertently discriminate. Identifying and mitigating bias requires conscious effort from developers.",
          warningNote: "AI bias has real consequences: biased hiring tools reject qualified candidates, biased loan algorithms deny credit unfairly, and biased facial recognition leads to wrongful arrests. As future technologists, it's your responsibility to build fair AI systems."
        },
        {
          heading: "Responsible AI Development",
          body: "Building responsible AI requires considering ethics at every stage — from data collection to deployment. Key principles include:\n\n**Fairness** — AI should not discriminate based on race, gender, age, or other protected characteristics. **Transparency** — people should know when AI is making decisions about them and understand how. **Privacy** — AI should protect personal data and use it only with consent.\n\n**Accountability** — there should always be a human responsible for AI decisions. **Safety** — AI systems should be tested thoroughly and have safeguards against misuse.\n\nAs AI becomes more powerful, these ethical considerations become more important. The AI systems you build will affect real people — always consider the impact.",
          illustration: [
            { emoji: "⚖️", label: "Fairness" },
            { emoji: "🔍", label: "Transparency" },
            { emoji: "🔒", label: "Privacy" },
            { emoji: "👤", label: "Accountability" },
            { emoji: "🛡️", label: "Safety" },
            { emoji: "🌍", label: "Social Good" }
          ],
          stepByStep: {
            steps: [
              { title: "Audit your data", description: "Check training data for demographic imbalances, historical biases, and underrepresented groups." },
              { title: "Test for fairness", description: "Evaluate model performance across different demographic groups to identify disparities." },
              { title: "Make it explainable", description: "Use interpretable models or explanation tools so users understand AI decisions." },
              { title: "Get diverse perspectives", description: "Include people from varied backgrounds in your development team and testing process." },
              { title: "Monitor continuously", description: "Bias can emerge over time as data changes. Regularly audit deployed AI systems." }
            ]
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "AI ___ occurs when training data doesn't represent the real world fairly.", answer: "bias" },
        { type: "true-false", question: "AI systems cannot discriminate if they are based on data.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Research an AI application in healthcare or education. Create a presentation explaining how it works, its benefits, potential biases, and safeguards needed to ensure fair use.", answer: "" },
      ]
    },
    {
      pageTitle: "AI in Practice",
      subtitle: "Real applications and hands-on experiments",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "AI Applications Today",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
          body: "AI is transforming every industry. Here's how AI is being used right now to solve real problems:\n\n**Healthcare:** AI analyzes medical images to detect diseases earlier than human doctors, predicts patient outcomes, and accelerates drug discovery. DeepMind's AlphaFold predicted the structure of 200 million proteins.\n\n**Education:** Adaptive learning platforms personalize content for each student, chatbots answer student questions 24/7, and AI helps teachers identify struggling students early.\n\n**Transportation:** Self-driving cars use computer vision and decision-making AI. Route optimization reduces delivery times and fuel consumption. Traffic management systems reduce congestion.\n\n**Creative Arts:** AI generates art, writes stories, composes music, and creates realistic images. Tools like DALL-E, Midjourney, and ChatGPT are changing how creative work is done.",
          table: {
            headers: ["Field", "AI Application", "Technology Used", "Impact"],
            rows: [
              ["🏥 Medicine", "Disease diagnosis from X-rays", "Computer Vision, Deep Learning", "Earlier detection saves lives"],
              ["🎓 Education", "Personalized learning paths", "Recommendation Systems", "Better outcomes for each student"],
              ["🚗 Transport", "Self-driving vehicles", "Computer Vision, Reinforcement Learning", "Safer roads, reduced accidents"],
              ["🎨 Creative", "AI art and content generation", "Generative AI, GANs", "New creative tools and workflows"],
              ["🌾 Agriculture", "Crop disease detection", "Image Classification", "Reduced crop losses"],
              ["🏦 Finance", "Fraud detection", "Anomaly Detection", "Real-time threat identification"]
            ]
          }
        },
        {
          heading: "Getting Started with AI Experiments",
          body: "You don't need a supercomputer to start experimenting with AI! Many free tools and platforms make AI accessible to students.\n\n**Google's Teachable Machine** lets you train image, audio, and pose classification models in your browser — no coding required. **Scratch** has AI extensions for image and text recognition. **Python with scikit-learn** lets you build real ML models with just a few lines of code.\n\n**Kaggle** is a platform with thousands of free datasets and competitions where you can practice data science and machine learning. Many courses and tutorials are available for free.",
          illustration: [
            { emoji: "🎯", label: "Teachable Machine" },
            { emoji: "🐍", label: "Python + sklearn" },
            { emoji: "📊", label: "Kaggle" },
            { emoji: "🧩", label: "Scratch AI" },
            { emoji: "☁️", label: "Google Colab" },
            { emoji: "🤗", label: "Hugging Face" }
          ],
          tip: "Start with Google's Teachable Machine (teachablemachine.withgoogle.com) — train an image classifier in 5 minutes without writing any code!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Google's ___ Machine lets you train AI models in the browser.", answer: "teachable" },
        { type: "true-false", question: "You need expensive hardware to start experimenting with AI.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Use Google's Teachable Machine to train an image classifier that recognizes 3 different objects. Test its accuracy and present your findings, including what worked well and what didn't.", answer: "" },
      ]
    }
  ]
};

// ======================== CLASS 10: APP DEVELOPMENT ========================
const c10AppDev: TopicTextbook = {
  topicId: "c10-app-dev",
  topicTitle: "App Development Projects",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Introduction to Mobile App Development",
      subtitle: "Understanding how mobile apps work",
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "The Mobile App Ecosystem",
          body: "**Mobile apps** are software applications designed specifically for smartphones and tablets. With over 6 billion smartphone users worldwide, mobile apps are the primary way people interact with technology.\n\nThe two major platforms are **iOS** (Apple's iPhone/iPad) and **Android** (Samsung, Google, etc.). Each has its own app store (App Store and Google Play), design guidelines, and development tools.\n\nApps can be categorized by type: **utility apps** (calculator, weather), **social apps** (Instagram, WhatsApp), **productivity apps** (Google Docs, Notion), **gaming apps**, **educational apps** (like CodeChamps!), and **e-commerce apps** (Amazon, Flipkart).",
          illustration: [
            { emoji: "📱", label: "iOS Apps" },
            { emoji: "🤖", label: "Android Apps" },
            { emoji: "🌐", label: "Web Apps" },
            { emoji: "🔄", label: "Hybrid Apps" },
            { emoji: "🎮", label: "Games" },
            { emoji: "🛒", label: "E-commerce" }
          ],
          youtubeId: "aM2ktMKAunw",
          keyTerms: [
            { term: "Native App", definition: "Built for one specific platform using its official language" },
            { term: "Hybrid App", definition: "One codebase that runs on multiple platforms" },
            { term: "Web App", definition: "A website that behaves like an app in the browser" },
            { term: "PWA", definition: "Progressive Web App — web app with native-like features" },
            { term: "SDK", definition: "Software Development Kit — tools for building apps" }
          ]
        },
        {
          heading: "Development Approaches Compared",
          body: "Choosing the right development approach depends on your goals, budget, timeline, and target audience.\n\n**Native development** produces the highest quality apps with full access to device features (camera, GPS, sensors), but requires separate codebases for iOS and Android. **Cross-platform frameworks** like React Native and Flutter let you write one codebase that works on both platforms — a great middle ground.\n\n**Web apps** are the easiest to build (just HTML/CSS/JS) but have limited access to device features. **PWAs** (Progressive Web Apps) bridge this gap by adding features like offline access and push notifications to web apps.",
          comparison: {
            left: { title: "Native Apps", points: ["Best performance and UX", "Full device feature access", "Platform-specific design", "Separate codebases needed", "Swift (iOS), Kotlin (Android)"] },
            right: { title: "Cross-Platform Apps", points: ["Single codebase for both platforms", "Near-native performance", "Faster development", "Shared team and skills", "React Native, Flutter, Xamarin"] }
          },
          table: {
            headers: ["Approach", "Languages", "Speed", "Device Access", "Best For"],
            rows: [
              ["Native iOS", "Swift, SwiftUI", "★★★★★", "Full", "High-performance iOS apps"],
              ["Native Android", "Kotlin, Java", "★★★★★", "Full", "High-performance Android apps"],
              ["React Native", "JavaScript", "★★★★☆", "Good", "Cross-platform with JS skills"],
              ["Flutter", "Dart", "★★★★☆", "Good", "Beautiful cross-platform UIs"],
              ["Web App", "HTML/CSS/JS", "★★★☆☆", "Limited", "Simple apps, no installation"]
            ]
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ apps use one codebase for multiple platforms.", answer: "hybrid" },
        { type: "true-false", question: "Native apps generally offer the best performance.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "Which framework uses the Dart programming language?", answer: "Flutter", choices: ["React Native", "Flutter", "Xamarin", "Ionic"] },
      ]
    },
    {
      pageTitle: "App Design and User Experience",
      subtitle: "Creating apps that users love",
      bannerColor: "from-amber-500 to-yellow-500",
      sections: [
        {
          heading: "UI/UX Design Principles",
          body: "The best apps aren't just functional — they're a pleasure to use. **UI (User Interface)** design focuses on how the app looks: colors, typography, icons, and layout. **UX (User Experience)** design focuses on how the app feels: is it intuitive? Can users accomplish their goals easily?\n\nGreat UX follows key principles: **simplicity** (don't make users think), **consistency** (same patterns throughout the app), **feedback** (show results of actions), and **accessibility** (usable by everyone, including people with disabilities).\n\nBefore writing any code, designers create **wireframes** (simple sketches showing layout) and **prototypes** (interactive mockups). This saves enormous time — it's much easier to change a sketch than rewrite code.",
          stepByStep: {
            steps: [
              { title: "Research your users", description: "Who will use your app? What problems do they have? What apps do they currently use?" },
              { title: "Sketch wireframes", description: "Draw simple layouts for each screen on paper. Focus on information hierarchy and flow." },
              { title: "Create a prototype", description: "Use tools like Figma (free!) to create clickable mockups." },
              { title: "Test with real users", description: "Have 3-5 people try your prototype. Watch where they get confused." },
              { title: "Iterate and improve", description: "Use feedback to refine designs before starting development." }
            ]
          },
          illustration: [
            { emoji: "✏️", label: "Wireframe" },
            { emoji: "🎨", label: "Visual Design" },
            { emoji: "👆", label: "Interaction" },
            { emoji: "♿", label: "Accessibility" },
            { emoji: "📐", label: "Layout" },
            { emoji: "🧪", label: "User Testing" }
          ]
        },
        {
          heading: "Mobile Design Patterns",
          body: "Mobile apps follow established **design patterns** — proven solutions to common interface problems. Understanding these patterns lets you create familiar, intuitive apps.\n\n**Navigation patterns** include tab bars (bottom navigation), hamburger menus (drawer), and stack navigation (screens push/pop like cards). **Content patterns** include lists, grids, cards, and detail views. **Input patterns** include forms, search, pickers, and gestures.\n\nBoth Apple and Google publish detailed design guidelines — **Human Interface Guidelines** (Apple) and **Material Design** (Google). Following these guidelines ensures your app feels native and familiar to users.",
          table: {
            headers: ["Pattern", "Use Case", "Example"],
            rows: [
              ["Tab Bar", "3-5 main sections", "Instagram: Home, Search, Reels, Shop, Profile"],
              ["Drawer/Hamburger", "Many navigation items", "Gmail: Inbox, Sent, Drafts, Labels..."],
              ["Cards", "Content previews", "Pinterest: image cards with info"],
              ["Pull to Refresh", "Update content", "Twitter: pull down to load new tweets"],
              ["Infinite Scroll", "Large content lists", "Facebook: endless news feed"],
              ["Bottom Sheet", "Contextual actions", "Google Maps: place details"]
            ]
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "UX stands for User ___.", answer: "experience" },
        { type: "true-false", question: "Wireframes are detailed, high-fidelity mockups.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which design system is created by Google?", answer: "Material Design", choices: ["Human Interface Guidelines", "Material Design", "Fluent Design", "Carbon Design"] },
        { type: "practice", question: "Design a school utility app: (1) Identify 5 features students need (2) Create wireframes for 5 screens (3) Plan the navigation pattern (4) Choose a color scheme and design the main screen mockup.", answer: "" },
      ]
    },
    {
      pageTitle: "Building with MIT App Inventor",
      subtitle: "Visual, block-based mobile app development",
      bannerColor: "from-yellow-500 to-orange-500",
      sections: [
        {
          heading: "Getting Started with App Inventor",
          body: "**MIT App Inventor** is a free, visual platform for building Android apps using drag-and-drop components and block-based programming — similar to Scratch but for real mobile apps.\n\nApp Inventor has two main views: the **Designer** (where you add and arrange UI components like buttons, text boxes, and images) and the **Blocks Editor** (where you add logic using snap-together blocks).\n\nDespite its simplicity, App Inventor can create powerful apps with features like camera access, GPS location, text-to-speech, web APIs, databases, and sensor data. Many published apps in the Google Play Store were built with App Inventor!",
          illustration: [
            { emoji: "🎨", label: "Designer View" },
            { emoji: "🧩", label: "Blocks Editor" },
            { emoji: "📱", label: "Live Testing" },
            { emoji: "📦", label: "Export APK" },
            { emoji: "🗄️", label: "Database" },
            { emoji: "📡", label: "Sensors" }
          ],
          stepByStep: {
            steps: [
              { title: "Open App Inventor", description: "Go to ai2.appinventor.mit.edu and sign in with a Google account." },
              { title: "Create a new project", description: "Click 'Start new project' and give it a meaningful name." },
              { title: "Design the UI", description: "Drag components from the palette: buttons, labels, text boxes, images, layouts." },
              { title: "Add logic with blocks", description: "Switch to Blocks view and create event handlers: when Button1.Click, do..." },
              { title: "Test on your phone", description: "Install MIT AI2 Companion app on your phone and scan the QR code to test live." },
              { title: "Build and share", description: "Click Build > App (APK) to download the installable app file." }
            ]
          },
          tip: "Start with MIT App Inventor to learn app concepts, then graduate to React Native or Flutter for professional apps."
        },
        {
          heading: "Building a Calculator App",
          body: "Let's build a simple but functional calculator app. This project teaches core concepts: button events, text manipulation, mathematical operations, and error handling.\n\nThe calculator has a display screen (Label component) and buttons for digits (0-9), operations (+, -, ×, ÷), equals, and clear. Each button press updates the display, and pressing equals calculates the result.\n\nThis same pattern — handling user input, processing data, and displaying results — is the foundation of every app, from social media to banking.",
          codeBlock: {
            language: "python",
            code: "# App Inventor block logic (as pseudocode):\n\n# Variables:\n# current_number = ''\n# stored_number = 0\n# operation = ''\n\n# When any digit button clicked:\n#   current_number = current_number + button.text\n#   display.text = current_number\n\n# When operation button (+, -, ×, ÷) clicked:\n#   stored_number = float(current_number)\n#   operation = button.text\n#   current_number = ''\n\n# When equals button clicked:\n#   second_number = float(current_number)\n#   if operation == '+':\n#       result = stored_number + second_number\n#   elif operation == '-':\n#       result = stored_number - second_number\n#   elif operation == '×':\n#       result = stored_number * second_number\n#   elif operation == '÷':\n#       if second_number != 0:\n#           result = stored_number / second_number\n#       else:\n#           display.text = 'Error: Division by 0'\n#   display.text = str(result)"
          }
        }
      ],
      exercises: [
        { type: "true-false", question: "MIT App Inventor uses block-based programming.", answer: "True", options: ["True", "False"] },
        { type: "fill-in-blank", question: "App Inventor has two main views: Designer and ___ Editor.", answer: "blocks" },
        { type: "practice", question: "Build a complete calculator app in App Inventor with: (1) All digit buttons 0-9 (2) Operations: +, -, ×, ÷ (3) Clear and equals buttons (4) Error handling for division by zero (5) A history of recent calculations.", answer: "" },
      ]
    },
    {
      pageTitle: "Advanced App Features",
      subtitle: "Databases, sensors, and APIs in your apps",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Data Storage in Apps",
          body: "Most apps need to store data that persists between sessions. Mobile apps have several storage options:\n\n**Local storage** (TinyDB in App Inventor) stores data on the device itself — perfect for user preferences, settings, and offline data. **Cloud databases** (Firebase, CloudDB) store data on servers accessible from anywhere — essential for multi-user apps, syncing across devices, and backups.\n\n**Files** (images, documents) can be stored locally or in cloud storage. Choosing the right storage method depends on data size, whether multiple devices need access, and offline requirements.",
          comparison: {
            left: { title: "Local Storage", points: ["Data stays on the device", "Works offline", "Fast access", "Lost if app is uninstalled", "Good for preferences, cache"] },
            right: { title: "Cloud Storage", points: ["Data on remote servers", "Requires internet", "Accessible from any device", "Survives app uninstall", "Good for user data, multi-user"] }
          },
          keyTerms: [
            { term: "TinyDB", definition: "App Inventor's local storage for simple key-value data" },
            { term: "CloudDB", definition: "App Inventor's cloud database for multi-device data" },
            { term: "Firebase", definition: "Google's cloud platform for mobile app backends" },
            { term: "SQLite", definition: "Lightweight database engine built into every smartphone" }
          ]
        },
        {
          heading: "Using Device Sensors and APIs",
          body: "Mobile devices are packed with sensors and capabilities that your apps can access: **GPS** (location), **accelerometer** (motion and tilt), **camera** (photos and video), **microphone** (audio), **compass** (direction), and **barometer** (atmospheric pressure).\n\n**APIs** let your app connect to external services: get weather data, translate text, send notifications, integrate maps, or access AI services. This transforms simple apps into powerful tools that leverage the entire internet.\n\nApp Inventor provides components for most device sensors and tools for calling web APIs. Combined with databases, sensors, and APIs, you can build sophisticated apps that rival commercial products.",
          illustration: [
            { emoji: "📍", label: "GPS" },
            { emoji: "📸", label: "Camera" },
            { emoji: "🎤", label: "Microphone" },
            { emoji: "🧭", label: "Compass" },
            { emoji: "📡", label: "APIs" },
            { emoji: "🔔", label: "Notifications" }
          ],
          tip: "Test sensor-based features on a real device, not the emulator. Many sensors aren't available in the desktop emulator."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ is App Inventor's local storage for simple key-value data.", answer: "TinyDB" },
        { type: "true-false", question: "Cloud databases require an internet connection to access data.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Design and build a school utility app with: (1) Timetable viewer (2) Assignment tracker with due dates (3) Marks calculator (4) Data saved to TinyDB (5) Clean, intuitive interface. Present your app to the class.", answer: "" },
      ]
    }
  ]
};

// ======================== CLASS 10: CAPSTONE ========================
const c10Capstone: TopicTextbook = {
  topicId: "c10-capstone",
  topicTitle: "Capstone Technology Project",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Understanding the Capstone Project",
      subtitle: "What it is and why it matters",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "What is a Capstone Project?",
          body: "A **capstone project** is a comprehensive, culminating project that demonstrates everything you've learned throughout your computer science journey. It's your chance to combine programming, design, problem-solving, and presentation skills into one impressive piece of work.\n\nUnlike homework exercises, a capstone project is **self-directed** — you choose the problem, design the solution, build it, and present it. This mirrors how real-world software development works: identifying problems and creating solutions.\n\nYour capstone project serves multiple purposes: it demonstrates your skills to future schools/employers, builds your portfolio, develops project management abilities, and gives you a real accomplishment to be proud of.",
          illustration: [
            { emoji: "🎯", label: "Problem" },
            { emoji: "💡", label: "Solution" },
            { emoji: "💻", label: "Build" },
            { emoji: "🧪", label: "Test" },
            { emoji: "📊", label: "Present" },
            { emoji: "🏆", label: "Achieve" }
          ],
          youtubeId: "8ext9G7xspg",
          keyTerms: [
            { term: "Capstone Project", definition: "A comprehensive project demonstrating cumulative learning" },
            { term: "Portfolio", definition: "A collection of your best work showcasing your skills" },
            { term: "Stakeholder", definition: "Anyone who has an interest in or is affected by your project" },
            { term: "Scope", definition: "The boundaries of what your project will and won't include" },
            { term: "Deliverable", definition: "A tangible output produced during the project" }
          ]
        },
        {
          heading: "Capstone Project Ideas",
          body: "Choose a project that excites you and solves a real problem. The best capstone projects combine **technical skills** with **real-world impact**. Here are some ideas organized by complexity and technology:\n\nRemember: it's better to build a simple project really well than to attempt something overly ambitious and deliver it poorly. Start with a clear, achievable scope and expand if time permits.",
          table: {
            headers: ["Project", "Technologies", "Difficulty", "Description"],
            rows: [
              ["🏫 School Management System", "Python, SQL, Flask", "★★★☆☆", "Student records, attendance, grades dashboard"],
              ["🌱 Environmental Monitor", "Python, Sensors, Charts", "★★★☆☆", "Track and visualize weather/pollution data"],
              ["📚 E-Library", "Web Dev, Database", "★★★☆☆", "Digital book catalog with search and reviews"],
              ["🎮 Educational Game", "Python/Scratch, Graphics", "★★★★☆", "Teaching tool for younger students"],
              ["💪 Fitness Tracker", "App Inventor, Database", "★★★★☆", "Log workouts and track progress over time"],
              ["🗞️ News Dashboard", "Web Dev, APIs", "★★★★☆", "Aggregate and display news from multiple sources"],
              ["🤖 AI Chatbot", "Python, NLP", "★★★★★", "Conversational assistant for a specific domain"],
              ["📊 Data Analysis Tool", "Python, Pandas, Flask", "★★★★★", "Upload data, get automatic analysis and charts"]
            ]
          },
          funFact: "Many successful startups began as student projects — your capstone could be the next big thing! Facebook, Google, and Dell all started in college."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A capstone project demonstrates ___ you've learned throughout the course.", answer: "everything" },
        { type: "true-false", question: "A good capstone project should solve a real-world problem.", answer: "True", options: ["True", "False"] },
        { type: "mcq", question: "What defines the boundaries of what a project will include?", answer: "Scope", choices: ["Budget", "Scope", "Timeline", "Team size"] },
      ]
    },
    {
      pageTitle: "Planning Your Capstone",
      subtitle: "From idea to actionable plan",
      bannerColor: "from-indigo-500 to-blue-500",
      sections: [
        {
          heading: "Project Proposal",
          body: "Every great project starts with a clear **proposal**. This document forces you to think through your project before writing a single line of code — saving enormous time and avoiding major problems.\n\nYour proposal should answer: **What** problem are you solving? **Who** is it for? **How** will you build it? **When** will each part be done? **What** technologies will you use?\n\nThe proposal also sets realistic expectations. By defining scope upfront, you avoid 'scope creep' — the tendency for projects to grow endlessly as new ideas emerge. A focused project delivered well is always better than an ambitious project delivered poorly.",
          stepByStep: {
            steps: [
              { title: "Problem Statement", description: "In 2-3 sentences, describe the problem your project solves. Why does it matter?" },
              { title: "Solution Overview", description: "Describe your solution in plain language. What will it do? What features are included?" },
              { title: "Technology Stack", description: "List the technologies you'll use and why (programming language, database, framework)." },
              { title: "Feature List", description: "Break your project into features. Mark each as 'Must Have', 'Should Have', or 'Nice to Have'." },
              { title: "Timeline", description: "Create a week-by-week schedule. Be realistic — everything takes longer than you think!" },
              { title: "Success Criteria", description: "How will you know the project is successful? Define measurable goals." }
            ]
          },
          tip: "Use the MoSCoW method for feature prioritization: Must have, Should have, Could have, Won't have (this time). Focus on 'Must have' first."
        },
        {
          heading: "Project Management",
          body: "Successful projects need active management throughout development. Professional developers use tools and techniques to stay organized, track progress, and handle unexpected challenges.\n\n**Version control** (Git) tracks every change and provides a safety net. **Task boards** (Trello, GitHub Projects) visualize what needs to be done, what's in progress, and what's complete. **Regular checkpoints** help you assess progress and adjust plans.\n\nThe most important project management skill is **recognizing problems early**. If you're behind schedule after week 1, you can adjust. If you don't realize until week 4, it's too late. Check your progress against your plan every week.",
          comparison: {
            left: { title: "Without Planning ❌", points: ["Start coding immediately", "No clear goals or timeline", "Features keep expanding", "Panic near the deadline", "Incomplete, buggy result"] },
            right: { title: "With Planning ✅", points: ["Proposal and timeline first", "Clear scope and milestones", "Focused feature set", "Steady progress throughout", "Polished, complete result"] }
          },
          warningNote: "The #1 reason student projects fail is scope creep — trying to build too much. Define your minimum viable product (MVP) early and get it working before adding extra features."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "MoSCoW stands for Must have, Should have, Could have, Won't ___.", answer: "have" },
        { type: "true-false", question: "Scope creep refers to uncontrolled growth in project features.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Write a complete project proposal: (1) Problem statement (2) Solution overview (3) Technology stack (4) Feature list with MoSCoW priorities (5) Weekly timeline (6) Success criteria.", answer: "" },
      ]
    },
    {
      pageTitle: "Building and Testing",
      subtitle: "Development best practices for your capstone",
      bannerColor: "from-blue-500 to-teal-500",
      sections: [
        {
          heading: "Development Best Practices",
          body: "Building your capstone project should follow the same professional practices used in the software industry.\n\n**Start with the foundation**: Set up your project structure, version control, and basic functionality before adding features. **Build incrementally**: Get a simple version working first (MVP), then add features one at a time. Each addition should be tested before moving on.\n\n**Write clean code**: Use meaningful variable names, add comments explaining WHY (not what), keep functions small and focused, and follow your language's style conventions. **Test as you go**: Don't wait until the end to test — test each feature as you build it.",
          codeBlock: {
            language: "python",
            code: "# Development checklist for your capstone:\n\n# Week 1-2: Foundation\n# □ Set up project structure\n# □ Initialize Git repository\n# □ Create basic UI/interface\n# □ Set up database (if needed)\n# □ Implement user authentication (if needed)\n\n# Week 3-4: Core Features\n# □ Build MVP with 'Must Have' features\n# □ Test core functionality\n# □ Fix critical bugs\n# □ Get early feedback from 2-3 users\n\n# Week 5-6: Enhancement\n# □ Add 'Should Have' features\n# □ Improve UI/UX based on feedback\n# □ Optimize performance\n# □ Write documentation\n\n# Week 7-8: Polish & Present\n# □ Final testing and bug fixes\n# □ Create README with screenshots\n# □ Prepare presentation/demo\n# □ Practice presenting"
          }
        },
        {
          heading: "Testing Your Project",
          body: "Testing ensures your project works correctly and handles edge cases gracefully. There are several types of testing you should perform:\n\n**Manual testing**: Use your project as a real user would. Try every feature, enter unexpected input, test edge cases. **User testing**: Have 3-5 people (who haven't seen your project) try it. Watch where they get confused — these are UX issues to fix.\n\n**Error testing**: Try to break your project on purpose — enter empty fields, very long text, special characters, negative numbers. A robust project handles all of these gracefully with helpful error messages instead of crashes.",
          table: {
            headers: ["Test Type", "What to Test", "How"],
            rows: [
              ["Functionality", "Does each feature work?", "Try every feature systematically"],
              ["Input Validation", "Bad/empty/extreme input?", "Enter invalid data, empty fields, huge numbers"],
              ["Edge Cases", "Unusual situations?", "No data, max data, concurrent actions"],
              ["Usability", "Is it intuitive?", "Have non-technical friends try it"],
              ["Performance", "Is it fast enough?", "Test with large datasets"],
              ["Error Handling", "Does it crash?", "Disconnect internet, enter wrong data types"]
            ]
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "MVP stands for Minimum ___ Product.", answer: "viable" },
        { type: "true-false", question: "You should only test your project after all features are complete.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a testing checklist for your capstone project with at least 20 specific test cases covering functionality, input validation, edge cases, and usability.", answer: "" },
      ]
    },
    {
      pageTitle: "Presenting Your Capstone",
      subtitle: "Showcasing your work effectively",
      bannerColor: "from-teal-500 to-emerald-500",
      sections: [
        {
          heading: "Creating an Effective Presentation",
          body: "Your capstone presentation is as important as the project itself. You could build the best project in the world, but if you can't explain it clearly, its impact is diminished.\n\nA great presentation tells a **story**: start with the problem (why should anyone care?), show your solution (what does it do?), demonstrate it live, explain the technical challenges you overcame, and share what you learned.\n\nKeep slides visual — no walls of text. Use screenshots, diagrams, and live demos. Practice your presentation multiple times. The best presenters look confident, speak clearly, and genuinely care about their work.",
          stepByStep: {
            steps: [
              { title: "Hook — The Problem (2 min)", description: "Start with a relatable story or statistic. Why does this problem matter?" },
              { title: "Solution Overview (2 min)", description: "Explain what you built in simple terms. Show the main screen/interface." },
              { title: "Live Demo (5 min)", description: "Walk through the key features. Show it working with real data." },
              { title: "Technical Deep Dive (3 min)", description: "Explain interesting technical decisions. Show architecture diagram." },
              { title: "Challenges & Learnings (2 min)", description: "Be honest about what was hard. Share what you learned." },
              { title: "Future Plans (1 min)", description: "What would you add with more time? What's the vision?" }
            ]
          }
        },
        {
          heading: "Building Your Portfolio",
          body: "Your capstone project is the crown jewel of your coding portfolio. A strong portfolio opens doors to scholarships, internships, competitions, and future opportunities.\n\n**GitHub** is your portfolio platform — publish your code with a well-written README that includes screenshots, feature descriptions, and setup instructions. Add a live demo link if possible.\n\nAs you build more projects, your GitHub profile tells a story of growth and capability. Consistent contributions, clean code, and well-documented projects show employers and admissions committees that you're a serious developer.\n\nRemember: your portfolio represents you. Make every project as polished as possible.",
          illustration: [
            { emoji: "📁", label: "GitHub Repo" },
            { emoji: "📝", label: "README" },
            { emoji: "📸", label: "Screenshots" },
            { emoji: "🔗", label: "Live Demo" },
            { emoji: "📊", label: "Documentation" },
            { emoji: "⭐", label: "Showcase" }
          ],
          tip: "Write your README as if explaining your project to someone who has never seen it. Include: what it does, screenshots, how to run it, technologies used, and what you learned."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A well-written ___ explains what your project does, how to run it, and what technologies you used.", answer: "README" },
        { type: "true-false", question: "Live demos are more effective than just showing screenshots.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create your complete capstone submission: (1) Project proposal document (2) Working project with clean code (3) README with screenshots (4) 15-minute presentation with live demo (5) Reflection on what you learned.", answer: "" },
      ]
    }
  ]
};

// Export all Class 9-10 content
export const CLASS_9_10_TEXTBOOKS: TopicTextbook[] = [
  c9PythonAdv,
  c9WebDev,
  c9SqlDb,
  c9Cybersec,
  c9DataSci,
  c10PythonProjects,
  c10WebApps,
  c10AiFund,
  c10AppDev,
  c10Capstone,
];
