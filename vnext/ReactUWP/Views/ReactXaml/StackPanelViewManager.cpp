// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"

#include "StackPanelViewManager.h"

#include <Views/ShadowNodeBase.h>

#include <Utils/PropertyUtils.h>
#include <Utils/ValueUtils.h>

#include <winrt/Windows.UI.Xaml.Documents.h>

namespace winrt {
using namespace Windows::UI::Xaml::Documents;
} // namespace winrt

namespace react {
namespace uwp {

StackPanelViewManager::StackPanelViewManager(
    const std::shared_ptr<IReactInstance> &reactInstance)
    : Super(reactInstance) {}


const char *StackPanelViewManager::GetName() const {
  return "RCTStackPanel";
}

XamlView StackPanelViewManager::CreateViewCore(int64_t tag) {
  auto stackPanel = winrt::StackPanel();
  return stackPanel;
}

folly::dynamic StackPanelViewManager::GetNativeProps() const {
  auto props = Super::GetNativeProps();

  props.update(folly::dynamic::object
    ("Orientation", "string")
  );

  return props;
}
void StackPanelViewManager::UpdateProperties(
    ShadowNodeBase *nodeToUpdate,
    const folly::dynamic &reactDiffMap) {
  auto stackPanel = nodeToUpdate->GetView().as<winrt::StackPanel>();
  if (stackPanel == nullptr)
    return;

  for (const auto &pair : reactDiffMap.items()) {
    const std::string &propertyName = pair.first.getString();
    const folly::dynamic &propertyValue = pair.second;

    if (propertyName == "Orientation") {
      if (propertyValue.isString()) {
        if (propertyValue.asString() == "Horizontal") {
          stackPanel.Orientation(
              winrt::Windows::UI::Xaml::Controls::Orientation::Horizontal);
        }
        else if (propertyValue.asString() == "Vertical") {
          stackPanel.Orientation(
              winrt::Windows::UI::Xaml::Controls::Orientation::Vertical);
        }
      } else if (propertyValue.isNull()) {
        stackPanel.ClearValue(winrt::StackPanel::OrientationProperty());
      }
    }
  }

  Super::UpdateProperties(nodeToUpdate, reactDiffMap);
}

void StackPanelViewManager::AddView(XamlView parent, XamlView child, int64_t index) {
  auto stackPanel(parent.as<winrt::StackPanel>());
  auto childElement(child.as<winrt::UIElement>());
  stackPanel.Children().InsertAt(static_cast<uint32_t>(index), childElement);
}

void StackPanelViewManager::RemoveAllChildren(XamlView parent) {
  auto stackPanel(parent.as<winrt::StackPanel>());
  stackPanel.Children().Clear();
}

void StackPanelViewManager::RemoveChildAt(XamlView parent, int64_t index) {
  auto stackPanel(parent.as<winrt::StackPanel>());
  stackPanel.Children().RemoveAt(static_cast<uint32_t>(index));
}

} // namespace uwp
} // namespace react
