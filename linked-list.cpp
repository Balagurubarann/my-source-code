#include <iostream>

struct Node {
	int val;
	Node *next;
	Node(): int val(0), next(nullptr) {}
	Node(int x): int val(x), next(nullptr) {}
	Node(int x, Node *next): int val(x), next(next) {}
};

Node* addTwoNumbers(Node *l1, Node *l2) {

	Node *headNode = new Node();
	Node *currentNode = headNode;
	int rem = 0;

	while (l1 != nullptr || l2 != nullptr || rem != 0) {

		int v1, v2;

		if (l1 != nullptr) v1 = l1 -> val;
		if (l2 != nullptr) v2 = l2 -> val;

		int sum = v1 + v2 + rem;

		rem = sum / 10;
		currentNode -> next = new Node(sum % 10);

		std::cout << currentNode -> val << std::endl;

		currentNode = currentNode -> next;

		if (l1 != nullptr) l1 = l1 -> next;
		if (l2 != nullptr) l2 = l2 -> next;
	}

	return headNode -> next;

}

int main(int argc, char **argv) {

	Node l1 = new Node(2);
	l1 -> next = new Node(4);
	l1 -> next -> next = new Node(3);

	Node l2 = new Node(5);
	l2 -> next = new Node(6);
	l2 -> next -> next = new Node(4);

	addTwoNumbers(l1, l2);

	return 0;

}
