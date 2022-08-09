#include<bits/stdc++.h>
using namespace std;


class Solution
{
    public:
    void hello()
    {
       static vector<vector<int>>memo(10,vector<int>(10,-1));
       memo[0][0]++;
       print(memo);

    }
    void print(vector<vector<int>>a)
    {
      for(int i = 0;i<10;i++)
      {
        for(int j = 0 ;j<10;j++)
        {
          cout<<a[i][j]<<" ";
        }
        cout<<endl;
      }
    }

};


int main()
 {
  Solution s;
  s.hello();
  cout<<endl;
  s.hello();
  cout<<endl;
  s.hello();
	return 0;
}
