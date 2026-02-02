#!/bin/bash

# Script to create branches for team members
# Usage: ./scripts/setup-team-branches.sh member1 member2 member3

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Setting up team branches ===${NC}\n"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${YELLOW}Error: Not a git repository${NC}"
    exit 1
fi

# Ensure we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}Switching to main branch...${NC}"
    git checkout main
fi

# Pull latest changes
echo -e "${BLUE}Pulling latest changes from main...${NC}"
git pull origin main

# Create branches for each team member
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}No team members provided. Usage:${NC}"
    echo "./scripts/setup-team-branches.sh member1 member2 member3"
    exit 1
fi

for member in "$@"; do
    BRANCH_NAME="feature/$member"
    
    echo -e "\n${BLUE}Creating branch: ${BRANCH_NAME}${NC}"
    
    git checkout -b "$BRANCH_NAME" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Branch created locally${NC}"
        
        # Push to remote
        git push -u origin "$BRANCH_NAME" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Branch pushed to remote${NC}"
        else
            echo -e "${YELLOW}⚠ Could not push to remote (may already exist)${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ Branch already exists, skipping...${NC}"
    fi
    
    # Switch back to main
    git checkout main
done

echo -e "\n${GREEN}=== Setup complete! ===${NC}"
echo -e "\n${BLUE}Created branches:${NC}"
for member in "$@"; do
    echo -e "  - feature/$member"
done

echo -e "\n${BLUE}Team members can now checkout their branches with:${NC}"
echo -e "  git checkout feature/<their-name>"
