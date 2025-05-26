import type { CodeLanguage } from "../context/appContext"

export const codeSnippets: Record<CodeLanguage, string[]> = {
  javascript: [
    `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(result);`,
    `const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

const adults = users.filter(user => user.age >= 18);
const names = adults.map(user => user.name);`,
    `async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`,
  ],
  python: [
    `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
    `class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def get_history(self):
        return self.history`,
    `import requests
import json

def get_weather(city):
    api_key = "your_api_key"
    url = f"http://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "appid": api_key}
    
    response = requests.get(url, params=params)
    return response.json()`,
  ],
  typescript: [
    `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
  }
  
  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }
}`,
    `type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`,
    `enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

interface Theme {
  primary: Color;
  secondary: Color;
  background: string;
}

const darkTheme: Theme = {
  primary: Color.Blue,
  secondary: Color.Green,
  background: "#1a1a1a"
};`,
  ],
  java: [
    `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
}`,
    `import java.util.*;

public class StudentManager {
    private List<Student> students;
    
    public StudentManager() {
        this.students = new ArrayList<>();
    }
    
    public void addStudent(Student student) {
        students.add(student);
    }
    
    public List<Student> getStudentsByGrade(char grade) {
        return students.stream()
            .filter(s -> s.getGrade() == grade)
            .collect(Collectors.toList());
    }
}`,
  ],
  cpp: [
    `#include <iostream>
#include <vector>
#include <algorithm>

class Matrix {
private:
    std::vector<std::vector<int>> data;
    int rows, cols;
    
public:
    Matrix(int r, int c) : rows(r), cols(c) {
        data.resize(rows, std::vector<int>(cols, 0));
    }
    
    void setValue(int row, int col, int value) {
        if (row < rows && col < cols) {
            data[row][col] = value;
        }
    }
    
    int getValue(int row, int col) const {
        return data[row][col];
    }
};`,
    `#include <memory>
#include <string>

template<typename T>
class SmartPointer {
private:
    T* ptr;
    
public:
    explicit SmartPointer(T* p) : ptr(p) {}
    
    ~SmartPointer() {
        delete ptr;
    }
    
    T& operator*() const {
        return *ptr;
    }
    
    T* operator->() const {
        return ptr;
    }
};`,
  ],
  html: [
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Web Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <nav class="navigation">
            <ul class="nav-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main class="main-content">
        <section class="hero">
            <h1>Welcome to Our Website</h1>
            <p>Discover amazing content and features.</p>
        </section>
    </main>
</body>
</html>`,
    `<form class="contact-form" action="/submit" method="POST">
    <div class="form-group">
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required>
    </div>
    
    <div class="form-group">
        <label for="email">Email Address:</label>
        <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    
    <button type="submit" class="submit-btn">Send Message</button>
</form>`,
  ],
  css: [
    `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}`,
    `@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 4rem 0;
  animation: fadeInUp 1s ease-out;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}`,
  ],
}

export const generateRandomCodeSnippet = (language: CodeLanguage) => {
  const snippets = codeSnippets[language]
  const randomIndex = Math.floor(Math.random() * snippets.length)
  return { paragraph: snippets[randomIndex] }
}
