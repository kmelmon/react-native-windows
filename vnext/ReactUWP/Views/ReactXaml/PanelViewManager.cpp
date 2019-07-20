// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"

#include "PanelViewManager.h"

#include <Views/ShadowNodeBase.h>

#include <Utils/PropertyUtils.h>
#include <Utils/ValueUtils.h>

#include <winrt/Windows.UI.Xaml.Documents.h>

namespace winrt {
using namespace Windows::UI::Xaml::Documents;
} // namespace winrt

namespace react {
namespace uwp {

PanelViewManager::PanelViewManager(
    const std::shared_ptr<IReactInstance> &reactInstance)
    : Super(reactInstance) {}

folly::dynamic PanelViewManager::GetNativeProps() const {
  auto props = Super::GetNativeProps();

  props.update(folly::dynamic::object("Background", "string"));

  return props;
}
void PanelViewManager::UpdateProperties(
    ShadowNodeBase *nodeToUpdate,
    const folly::dynamic &reactDiffMap) {
  auto panel = nodeToUpdate->GetView().as<winrt::Panel>();
  if (panel == nullptr)
    return;

  for (const auto &pair : reactDiffMap.items()) {
    const std::string &propertyName = pair.first.getString();
    const folly::dynamic &propertyValue = pair.second;

    if (propertyName == "Background") {
      if (propertyValue.isString()) {
        panel.Background(SolidColorBrushFromColor(propertyValue.asString()));
      } else if (propertyValue.isNull()) {
        panel.ClearValue(winrt::Panel::BackgroundProperty());
      }
    }
  }
  Super::UpdateProperties(nodeToUpdate, reactDiffMap);
}

void PanelViewManager::AddView(XamlView parent, XamlView child, int64_t index) {
  auto panel(parent.as<winrt::Panel>());
  auto childElement(child.as<winrt::UIElement>());
  panel.Children().InsertAt(static_cast<uint32_t>(index), childElement);
}

void PanelViewManager::RemoveAllChildren(XamlView parent) {
  auto panel(parent.as<winrt::Panel>());
  panel.Children().Clear();
}

void PanelViewManager::RemoveChildAt(XamlView parent, int64_t index) {
  auto panel(parent.as<winrt::Panel>());
  panel.Children().RemoveAt(static_cast<uint32_t>(index));
}

} // namespace uwp
} // namespace react
