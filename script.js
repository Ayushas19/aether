const algorithms = [
    {
        name: "Linear Search",
        category: "Searching",
        code: `#include <iostream>
using namespace std;

// Function to perform Linear Search
// Time Complexity: O(n)
// Space Complexity: O(1)
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 30;

    int result = linearSearch(arr, n, target);
    if (result != -1)
        cout << "Element found at index: " << result << endl;
    else
        cout << "Element not found" << endl;

    return 0;
}`
    },
    {
        name: "Binary Search",
        category: "Searching",
        code: `#include <iostream>
using namespace std;

// Binary Search (Requires sorted array)
// Time Complexity: O(log n)
// Space Complexity: O(1)
int binarySearch(int arr[], int low, int high, int target) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target)
            return mid;
            
        if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;
    
    int result = binarySearch(arr, 0, n - 1, target);
    if (result != -1)
        cout << "Element found at index: " << result << endl;
    else
        cout << "Element not found" << endl;
        
    return 0;
}`
    },
    {
        name: "Quick Sort",
        category: "Sorting",
        code: `#include <iostream>
using namespace std;

// Partition function for Quick Sort
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

// Quick Sort implementation
// Time Complexity: O(n log n) average, O(n^2) worst
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) cout << arr[i] << " ";
    cout << endl;
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    quickSort(arr, 0, n - 1);
    cout << "Sorted array: ";
    printArray(arr, n);
    return 0;
}`
    },
    {
        name: "Merge Sort",
        category: "Sorting",
        code: `#include <iostream>
using namespace std;

// Merges two subarrays of arr[]
void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

// Merge Sort implementation
// Time Complexity: O(n log n)
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    mergeSort(arr, 0, n - 1);
    cout << "Sorted array: ";
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    return 0;
}`
    },
    {
        name: "Selection Sort",
        category: "Sorting",
        code: `#include <iostream>
using namespace std;

// Selection Sort algorithm
// Time Complexity: O(n^2)
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        swap(arr[min_idx], arr[i]);
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    selectionSort(arr, n);
    cout << "Sorted array: ";
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    return 0;
}`
    },
    {
        name: "Bubble Sort",
        category: "Sorting",
        code: `#include <iostream>
using namespace std;

// Bubble Sort algorithm
// Time Complexity: O(n^2)
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    int arr[] = {5, 1, 4, 2, 8};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    cout << "Sorted array: ";
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    return 0;
}`
    },
    {
        name: "Counting Sort",
        category: "Sorting",
        code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Counting Sort for small range integers
// Time Complexity: O(n + k)
void countingSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    vector<int> count(maxVal + 1, 0);
    vector<int> output(arr.size());

    for (int x : arr) count[x]++;
    for (int i = 1; i <= maxVal; i++) count[i] += count[i - 1];
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    arr = output;
}

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1};
    countingSort(arr);
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    return 0;
}`
    },
    {
        name: "Radix Sort",
        category: "Sorting",
        code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];
    return mx;
}

void countSort(int arr[], int n, int exp) {
    int output[n], count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

// Radix Sort algorithm
void radixSort(int arr[], int n) {
    int m = getMax(arr, n);
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}

int main() {
    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int n = sizeof(arr) / sizeof(arr[0]);
    radixSort(arr, n);
    cout << "Sorted array: ";
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    return 0;
}`
    },
    {
        name: "Bucket Sort",
        category: "Sorting",
        code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Bucket Sort (for float range [0, 1))
void bucketSort(float arr[], int n) {
    vector<float> b[n];
    for (int i = 0; i < n; i++) {
        int bi = n * arr[i];
        b[bi].push_back(arr[i]);
    }
    for (int i = 0; i < n; i++) sort(b[i].begin(), b[i].end());
    int index = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < b[i].size(); j++)
            arr[index++] = b[i][j];
}

int main() {
    float arr[] = {0.897, 0.565, 0.656, 0.123, 0.665, 0.343};
    int n = sizeof(arr) / sizeof(arr[0]);
    bucketSort(arr, n);
    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`
    },
    {
        name: "0/1 Knapsack",
        category: "Dynamic Programming",
        code: `#include <iostream>
#include <vector>
using namespace std;

// 0/1 Knapsack problem using Dynamic Programming
// Time Complexity: O(n*W)
int knapsack(int W, int wt[], int val[], int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1));

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i - 1] <= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    int n = sizeof(val) / sizeof(val[0]);
    cout << "Maximum value in Knapsack: " << knapsack(W, wt, val, n);
    return 0;
}`
    },
    {
        name: "Fractional Knapsack",
        category: "Greedy",
        code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Item {
    int value, weight;
};

bool cmp(Item a, Item b) {
    double r1 = (double)a.value / (double)a.weight;
    double r2 = (double)b.value / (double)b.weight;
    return r1 > r2;
}

// Fractional Knapsack using Greedy approach
double fractionalKnapsack(int W, Item arr[], int n) {
    sort(arr, arr + n, cmp);
    double finalvalue = 0.0;

    for (int i = 0; i < n; i++) {
        if (arr[i].weight <= W) {
            W -= arr[i].weight;
            finalvalue += arr[i].value;
        } else {
            finalvalue += arr[i].value * ((double)W / (double)arr[i].weight);
            break;
        }
    }
    return finalvalue;
}

int main() {
    int W = 50;
    Item arr[] = {{60, 10}, {100, 20}, {120, 30}};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << "Maximum value in Knapsack: " << fractionalKnapsack(W, arr, n);
    return 0;
}`
    },
    {
        name: "Huffman Encoding",
        category: "Greedy",
        code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Node {
    char data;
    int freq;
    Node *left, *right;
    Node(char d, int f) : data(d), freq(f), left(NULL), right(NULL) {}
};

struct compare {
    bool operator()(Node* l, Node* r) { return (l->freq > r->freq); }
};

void printCodes(Node* root, string str) {
    if (!root) return;
    if (root->data != '$') cout << root->data << ": " << str << endl;
    printCodes(root->left, str + "0");
    printCodes(root->right, str + "1");
}

// Huffman Coding algorithm
void HuffmanCodes(char data[], int freq[], int size) {
    priority_queue<Node*, vector<Node*>, compare> minHeap;
    for (int i = 0; i < size; ++i) minHeap.push(new Node(data[i], freq[i]));

    while (minHeap.size() != 1) {
        Node *left = minHeap.top(); minHeap.pop();
        Node *right = minHeap.top(); minHeap.pop();
        Node *top = new Node('$', left->freq + right->freq);
        top->left = left; top->right = right;
        minHeap.push(top);
    }
    printCodes(minHeap.top(), "");
}

int main() {
    char arr[] = { 'a', 'b', 'c', 'd', 'e', 'f' };
    int freq[] = { 5, 9, 12, 13, 16, 45 };
    int size = sizeof(arr) / sizeof(arr[0]);
    HuffmanCodes(arr, freq, size);
    return 0;
}`
    }
];

// Helper function to copy code to clipboard
function copyCode(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "Copied!";
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('copied');
        }, 2000);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-follower');
    const searchTrigger = document.getElementById('search-trigger');
    const searchPanel = document.getElementById('search-panel');
    const closeSearch = document.getElementById('close-search');
    const algoSearchInput = document.getElementById('algo-search-input');
    const algoResults = document.getElementById('algo-results');

    // Cursor Follower
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    });

    // Toggle Search Panel
    searchTrigger.addEventListener('click', () => {
        searchPanel.classList.add('active');
        algoSearchInput.focus();
        renderAlgorithms();
    });

    closeSearch.addEventListener('click', () => {
        searchPanel.classList.remove('active');
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') searchPanel.classList.remove('active');
    });

    // Search Filtering
    algoSearchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        renderAlgorithms(term);
    });

    function renderAlgorithms(filter = '') {
        algoResults.innerHTML = '';
        const filtered = algorithms.filter(a => 
            a.name.toLowerCase().includes(filter) || 
            a.category.toLowerCase().includes(filter)
        );

        filtered.forEach(algo => {
            const card = document.createElement('div');
            card.className = 'algo-card';
            card.innerHTML = `
                <div class="algo-card-header">
                    <h3>${algo.name} <small style="font-size: 0.7rem; color: #666; font-weight: normal; margin-left: 10px;">${algo.category}</small></h3>
                    <button class="copy-btn" onclick="copyCode(this, \`${algo.code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`)">Copy Code</button>
                </div>
                <pre class="code-block"><code>${algo.code}</code></pre>
            `;
            algoResults.appendChild(card);
        });

        if (filtered.length === 0) {
            algoResults.innerHTML = '<p style="text-align:center; color: #666;">No algorithms found matching your search.</p>';
        }
    }

    // Initialize with all
    renderAlgorithms();
});
